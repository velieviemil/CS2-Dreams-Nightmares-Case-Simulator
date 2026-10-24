/**
 * ============================================================================
 * CS2 CASE OPENING SIMULATION - DREAMS & NIGHTMARES CASE SIMULATOR
 * ============================================================================
 * 
 * Features:
 * - Hidden Roulette Viewport on Load (Authentic CS2 Container Inspect Hero)
 * - Reveal Animation Track upon clicking "Unlock Container"
 * - Dreams & Nightmares Case Drop Pool (17 official weapon finishes + Knives)
 * - Gold Question Mark Icon for Knives/Gloves during the spin
 * - Reveal actual item upon spin completion
 * - Direct Steam/Akamai CDN Assets for all items
 * - Full Economy (Instant Sell, Inventory Stash Liquidation, Balance Tweening)
 * - Zero-Dependency Web Audio API Sound Effects
 * ============================================================================
 */

import { 
  CASE_ITEMS, 
  openCase, 
  DREAMS_CASE_METADATA, 
  GOLD_QUESTION_MARK_IMAGE 
} from './caseLogic.js';

// ----------------------------------------------------------------------------
// MODULE 1: CONFIGURATION & CENTRALIZED STATE STORE
// ----------------------------------------------------------------------------
const CONFIG = {
  STRIP_CARD_COUNT: 45,        // Total items rendered in the roulette reel
  TARGET_INDEX: 35,            // Deterministic slot for the winning item
  ANIMATION_DURATION_SEC: 6.5, // Total spin time in seconds
  TIMING_FUNCTION: 'cubic-bezier(0.12, 0.8, 0.38, 1)', // CS2 deceleration profile
  CARD_SAFETY_MARGIN_PX: 18,   // Safe boundary margin inside card borders
  CASE_COST: 2.50,             // Opening cost ($)
  DEFAULT_BALANCE: 250.00,     // Initial demo wallet balance ($)
  DEPOSIT_AMOUNT: 50.00        // Quick deposit step ($)
};

// Application State
const state = {
  balance: CONFIG.DEFAULT_BALANCE,
  userInventory: [],
  isSpinning: false,
  activeWinningItem: null,
  isViewportActive: false
};

// Storage Keys
const STORAGE_KEYS = {
  BALANCE: 'cs2_dnc_simulator_balance',
  INVENTORY: 'cs2_dnc_simulator_inventory'
};

function loadState() {
  try {
    const savedBalance = localStorage.getItem(STORAGE_KEYS.BALANCE);
    if (savedBalance !== null) {
      const parsed = parseFloat(savedBalance);
      if (!isNaN(parsed)) state.balance = parsed;
    }

    const savedInventory = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (savedInventory) {
      const parsed = JSON.parse(savedInventory);
      if (Array.isArray(parsed)) state.userInventory = parsed;
    }
  } catch (err) {
    console.warn('[CS2 Simulator] Storage retrieval fallback:', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.BALANCE, state.balance.toFixed(2));
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.userInventory));
  } catch (err) {
    console.warn('[CS2 Simulator] Storage persistence error:', err);
  }
}

// ----------------------------------------------------------------------------
// MODULE 2: WEB AUDIO API SYNTHESIZER
// ----------------------------------------------------------------------------
class SoundFXEngine {
  constructor() {
    this.audioCtx = null;
    this.tickerInterval = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playClick() {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playVictory(rarity) {
    if (!this.audioCtx) return;
    try {
      const chords = rarity === 'Special' 
        ? [523.25, 659.25, 783.99, 1046.50] // C Major fanfare for Knives
        : rarity === 'Covert'
        ? [440.00, 554.37, 659.25]          // A Major chord for Reds
        : [392.00, 493.88, 587.33];         // G Major chord

      chords.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = rarity === 'Special' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + idx * 0.08 + 0.85);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.08);
        osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.9);
      });
    } catch {
      // Audio catch
    }
  }

  playSell() {
    if (!this.audioCtx) return;
    try {
      const notes = [987.77, 1318.51]; // B5 to E6 ascending cash chime
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.07);
        osc.stop(this.audioCtx.currentTime + idx * 0.07 + 0.28);
      });
    } catch {
      // Audio catch
    }
  }

  startReelTicking(durationMs) {
    this.stopReelTicking();
    const startTime = Date.now();

    const tickLoop = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      if (progress < 1) {
        this.playClick();
        const nextDelay = 35 + Math.pow(progress, 3) * 360;
        this.tickerInterval = setTimeout(tickLoop, nextDelay);
      }
    };

    tickLoop();
  }

  stopReelTicking() {
    if (this.tickerInterval) {
      clearTimeout(this.tickerInterval);
      this.tickerInterval = null;
    }
  }
}

const sfx = new SoundFXEngine();

// ----------------------------------------------------------------------------
// MODULE 3: CACHED DOM REFERENCES
// ----------------------------------------------------------------------------
const DOM = {
  // Showcase View
  caseShowcase: document.getElementById('case-showcase'),
  showcaseOpenBtn: document.getElementById('showcase-open-btn'),
  caseGalleryGrid: document.getElementById('case-gallery-grid'),
  // Viewport Section (Hidden on load)
  caseViewportSection: document.getElementById('case-viewport-section'),
  caseViewport: document.getElementById('case-viewport'),
  itemsStrip: document.getElementById('items-strip'),
  openCaseBtn: document.getElementById('open-case-btn'),
  backToCaseBtn: document.getElementById('back-to-case-btn'),
  winningItemContainer: document.getElementById('winning-item-container'),
  // Header / Economy Controls
  userBalance: document.getElementById('user-balance'),
  addFundsBtn: document.getElementById('add-funds-btn'),
  inventoryCountBadge: document.getElementById('inventory-count-badge'),
  inventoryGrid: document.getElementById('inventory-grid'),
  invTotalCount: document.getElementById('inv-total-count'),
  clearInvBtn: document.getElementById('clear-inv-btn'),
  inventorySection: document.getElementById('inventory-section'),
  inventoryToggleBtn: document.getElementById('inventory-toggle-btn'),
  // Victory Modal Elements
  victoryModal: document.getElementById('victory-modal'),
  modalCard: document.getElementById('modal-card'),
  modalFlare: document.getElementById('modal-flare'),
  modalRarityBadge: document.getElementById('modal-rarity-badge'),
  modalWeaponImg: document.getElementById('modal-weapon-img'),
  modalWeaponType: document.getElementById('modal-weapon-type'),
  modalSkinName: document.getElementById('modal-skin-name'),
  modalPriceVal: document.getElementById('modal-price-val'),
  modalSellPrice: document.getElementById('modal-sell-price'),
  modalKeepBtn: document.getElementById('modal-keep-btn'),
  modalSellBtn: document.getElementById('modal-sell-btn'),
  modalSpinAgainBtn: document.getElementById('modal-spin-again-btn')
};

// ----------------------------------------------------------------------------
// MODULE 4: SMOOTH VISUAL BALANCE ANIMATION
// ----------------------------------------------------------------------------
let currentDisplayedBalance = state.balance;
let balanceAnimationTimer = null;

function updateBalanceDisplay(targetBalance = state.balance, type = 'neutral') {
  if (!DOM.userBalance) return;

  if (balanceAnimationTimer) {
    clearInterval(balanceAnimationTimer);
  }

  DOM.userBalance.classList.remove('pulse-up', 'pulse-down');
  void DOM.userBalance.offsetWidth; // Force Reflow

  if (type === 'credit') {
    DOM.userBalance.classList.add('pulse-up');
  } else if (type === 'debit') {
    DOM.userBalance.classList.add('pulse-down');
  }

  const startVal = currentDisplayedBalance;
  const endVal = targetBalance;
  const startTime = Date.now();
  const duration = 400;

  balanceAnimationTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    const interpolated = startVal + (endVal - startVal) * eased;

    DOM.userBalance.textContent = `$${interpolated.toFixed(2)}`;

    if (progress >= 1) {
      clearInterval(balanceAnimationTimer);
      balanceAnimationTimer = null;
      currentDisplayedBalance = endVal;
      DOM.userBalance.textContent = `$${endVal.toFixed(2)}`;
    }
  }, 16);
}

// ----------------------------------------------------------------------------
// MODULE 5: REEL GENERATION & GOLD QUESTION MARK MYSTERY
// ----------------------------------------------------------------------------
function getRarityClass(rarity) {
  switch (rarity) {
    case 'Mil-Spec': return 'rarity-mil-spec';
    case 'Restricted': return 'rarity-restricted';
    case 'Classified': return 'rarity-classified';
    case 'Covert': return 'rarity-covert';
    case 'Special': return 'rarity-special';
    default: return 'rarity-mil-spec';
  }
}

/**
 * Creates the HTML markup for an item card on the roulette strip.
 * For Special/Knives, displays the classic CS2 Gold Question Mark icon during spin!
 */
function createCardMarkup(item, index) {
  const isSpecial = item.rarity === 'Special';
  const rarityClass = getRarityClass(item.rarity);

  // During the spin, knives are masked with the iconic Gold CS2 Question Mark
  const displayImage = isSpecial ? GOLD_QUESTION_MARK_IMAGE : item.image;
  const displayWeapon = isSpecial ? '★ Rare Special Item ★' : item.weapon;
  const displayName = isSpecial ? 'Special Item' : item.name;
  const specialClass = isSpecial ? 'is-special-mystery' : '';

  return `
    <article 
      class="item-card ${rarityClass} ${specialClass}" 
      data-index="${index}"
      data-id="${item.id}"
      data-rarity="${item.rarity}"
      data-actual-name="${item.name}"
      data-actual-weapon="${item.weapon}"
      data-actual-image="${item.image}"
    >
      <div class="item-header">
        <span class="item-weapon">${displayWeapon}</span>
        <span class="item-name" title="${displayName}">${displayName}</span>
      </div>
      <div class="item-visual">
        <img class="item-image" src="${displayImage}" alt="${displayWeapon}" loading="lazy" />
      </div>
      <div class="item-footer">
        <span class="item-rarity-badge">${item.rarity}${isSpecial ? ' ★' : ''}</span>
      </div>
    </article>
  `;
}

export function generateStrip(winningItem) {
  if (!DOM.itemsStrip) return;

  const cardsHtml = [];
  for (let i = 0; i < CONFIG.STRIP_CARD_COUNT; i++) {
    const item = (i === CONFIG.TARGET_INDEX) ? winningItem : openCase();
    cardsHtml.push(createCardMarkup(item, i));
  }

  DOM.itemsStrip.innerHTML = cardsHtml.join('');
}

export function calculateTargetTranslateX(targetCard, viewport) {
  const viewportWidth = viewport.clientWidth;
  const cardOffsetLeft = targetCard.offsetLeft;
  const cardWidth = targetCard.offsetWidth;

  const cardCenter = cardOffsetLeft + (cardWidth / 2);
  const viewportCenter = viewportWidth / 2;
  const baseTranslateX = viewportCenter - cardCenter;

  const maxJitter = (cardWidth / 2) - CONFIG.CARD_SAFETY_MARGIN_PX;
  const randomJitter = (Math.random() * (maxJitter * 2)) - maxJitter;

  return Math.round((baseTranslateX + randomJitter) * 100) / 100;
}

// ----------------------------------------------------------------------------
// MODULE 6: CASE SHOWCASE GALLERY RENDERING
// ----------------------------------------------------------------------------
function renderCaseGallery() {
  if (!DOM.caseGalleryGrid) return;

  // Add the 17 standard weapon skins
  const standardSkins = CASE_ITEMS.filter(item => item.rarity !== 'Special');

  let html = standardSkins.map(item => `
    <div class="gallery-chip" style="border-bottom: 2px solid ${item.color};">
      <img class="gallery-chip-img" src="${item.image}" alt="${item.name}" loading="lazy" />
      <span class="gallery-chip-weapon">${item.weapon}</span>
      <span class="gallery-chip-name" title="${item.name}">${item.name}</span>
      <span class="gallery-chip-price">$${item.price.toFixed(2)}</span>
    </div>
  `).join('');

  // Add the iconic Gold Mystery Knife chip at the end
  html += `
    <div class="gallery-chip" style="border-bottom: 2px solid #ffd700; background: radial-gradient(circle at 50% 90%, rgba(255, 215, 0, 0.2) 0%, #1e222b 75%);">
      <img class="gallery-chip-img" src="${GOLD_QUESTION_MARK_IMAGE}" alt="Rare Special Item" />
      <span class="gallery-chip-weapon" style="color: #ffd700;">★ Special Item ★</span>
      <span class="gallery-chip-name" style="color: #ffe259;">Knives / Gamma Doppler</span>
      <span class="gallery-chip-price" style="color: #ffd700;">$480+</span>
    </div>
  `;

  DOM.caseGalleryGrid.innerHTML = html;
}

// ----------------------------------------------------------------------------
// MODULE 7: INVENTORY STASH & LIQUIDATION / SALE ACTIONS
// ----------------------------------------------------------------------------
function renderInventory() {
  if (!DOM.inventoryGrid) return;

  const count = state.userInventory.length;
  const totalStashValue = state.userInventory.reduce((acc, item) => acc + (item.price || 0), 0);

  if (DOM.inventoryCountBadge) DOM.inventoryCountBadge.textContent = count;
  if (DOM.invTotalCount) {
    DOM.invTotalCount.innerHTML = `${count} <span style="color:#10b981; font-weight:700; margin-left:6px;">($${totalStashValue.toFixed(2)})</span>`;
  }

  if (count === 0) {
    DOM.inventoryGrid.innerHTML = `
      <div class="inventory-empty" id="inventory-empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
          <rect width="20" height="14" x="2" y="5" rx="2"/>
          <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
        <p>Your inventory is empty. Open a Dreams &amp; Nightmares case to collect your first weapon skin!</p>
      </div>
    `;
    return;
  }

  const itemsMarkup = [...state.userInventory].reverse().map((item) => {
    const isSpecial = item.rarity === 'Special';
    const formattedPrice = (item.price || 0.50).toFixed(2);

    return `
      <div 
        class="inv-card" 
        style="border-bottom: 3px solid ${item.color}; background: radial-gradient(circle at 50% 90%, ${item.color}15 0%, #1e222b 75%);"
      >
        <div class="inv-card-visual">
          <img src="${item.image}" alt="${item.weapon} | ${item.name}" loading="lazy" />
        </div>
        <div class="inv-card-info">
          <span class="inv-weapon">${item.weapon}</span>
          <span class="inv-name" title="${item.name}">${item.name}</span>
        </div>
        <div class="inv-card-footer">
          <span style="color: ${item.color}; font-weight: 700;">
            ${item.rarity}${isSpecial ? ' ★' : ''}
          </span>
          <span style="color: #10b981; font-weight: 700; font-family: monospace;">$${formattedPrice}</span>
        </div>
        <button 
          class="inv-sell-btn" 
          type="button" 
          data-instance-id="${item.instanceId}" 
          data-price="${formattedPrice}"
        >
          Sell for $${formattedPrice}
        </button>
      </div>
    `;
  }).join('');

  DOM.inventoryGrid.innerHTML = itemsMarkup;
}

function addToInventory(item) {
  const inventoryEntry = {
    ...item,
    instanceId: `${item.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    unboxedAt: Date.now()
  };

  state.userInventory.push(inventoryEntry);
  saveState();
  renderInventory();
}

function sellInventoryItem(instanceId) {
  const itemIndex = state.userInventory.findIndex(item => item.instanceId === instanceId);
  if (itemIndex === -1) return;

  const itemToSell = state.userInventory[itemIndex];
  const sellPrice = itemToSell.price || 0;

  state.userInventory.splice(itemIndex, 1);
  state.balance += sellPrice;
  saveState();

  sfx.playSell();
  updateBalanceDisplay(state.balance, 'credit');
  renderInventory();

  console.log(`[CS2 Economy] Sold ${itemToSell.weapon} | ${itemToSell.name} for $${sellPrice.toFixed(2)}.`);
}

// ----------------------------------------------------------------------------
// MODULE 8: VICTORY MODAL & INSTANT ACTIONS
// ----------------------------------------------------------------------------
function showVictoryModal(item) {
  if (!DOM.victoryModal) return;

  const isSpecial = item.rarity === 'Special';
  const formattedPrice = (item.price || 0.50).toFixed(2);

  if (DOM.modalFlare) {
    DOM.modalFlare.style.background = `radial-gradient(circle, ${item.color} 0%, transparent 70%)`;
  }
  if (DOM.modalCard) {
    DOM.modalCard.style.borderColor = `${item.color}60`;
  }
  if (DOM.modalRarityBadge) {
    DOM.modalRarityBadge.textContent = `${item.rarity}${isSpecial ? ' ★ Special Item' : ''}`;
    DOM.modalRarityBadge.style.color = item.color;
    DOM.modalRarityBadge.style.borderColor = `${item.color}50`;
  }
  if (DOM.modalWeaponImg) {
    DOM.modalWeaponImg.src = item.image;
    DOM.modalWeaponImg.alt = `${item.weapon} | ${item.name}`;
  }
  if (DOM.modalWeaponType) {
    DOM.modalWeaponType.textContent = item.weapon;
  }
  if (DOM.modalSkinName) {
    DOM.modalSkinName.textContent = item.name;
    DOM.modalSkinName.style.textShadow = `0 0 20px ${item.color}60`;
  }
  if (DOM.modalPriceVal) {
    DOM.modalPriceVal.textContent = `$${formattedPrice}`;
  }
  if (DOM.modalSellPrice) {
    DOM.modalSellPrice.textContent = `$${formattedPrice}`;
  }

  DOM.victoryModal.classList.add('active');
  DOM.victoryModal.setAttribute('aria-hidden', 'false');

  sfx.playVictory(item.rarity);
}

function closeVictoryModal() {
  if (!DOM.victoryModal) return;
  DOM.victoryModal.classList.remove('active');
  DOM.victoryModal.setAttribute('aria-hidden', 'true');
}

function handleKeepItem() {
  if (!state.activeWinningItem) return;
  addToInventory(state.activeWinningItem);
  closeVictoryModal();
}

function handleInstantSell() {
  if (!state.activeWinningItem) return;
  const sellPrice = state.activeWinningItem.price || 0;

  state.balance += sellPrice;
  saveState();

  sfx.playSell();
  updateBalanceDisplay(state.balance, 'credit');
  closeVictoryModal();
}

// ----------------------------------------------------------------------------
// MODULE 9: VIEWPORT SWITCHING & ROULETTE ORCHESTRATION
// ----------------------------------------------------------------------------
function switchToRouletteViewport() {
  if (DOM.caseShowcase && DOM.caseViewportSection) {
    DOM.caseShowcase.classList.add('hidden');
    DOM.caseViewportSection.classList.remove('hidden');
    state.isViewportActive = true;
  }
}

function switchToShowcase() {
  if (state.isSpinning) return;
  if (DOM.caseShowcase && DOM.caseViewportSection) {
    DOM.caseViewportSection.classList.add('hidden');
    DOM.caseShowcase.classList.remove('hidden');
    state.isViewportActive = false;
  }
}

export function startCaseRoll() {
  if (state.isSpinning) return;

  sfx.init();

  if (state.balance < CONFIG.CASE_COST) {
    alert(`Insufficient funds! Dreams & Nightmares Case requires $${CONFIG.CASE_COST.toFixed(2)}. Click "+ $50.00" to refill.`);
    return;
  }

  // 1. Reveal Roulette Viewport (Hidden initially like CS2)
  switchToRouletteViewport();
  closeVictoryModal();

  // 2. Deduct key cost & trigger debit pulse
  state.balance -= CONFIG.CASE_COST;
  state.isSpinning = true;
  saveState();
  updateBalanceDisplay(state.balance, 'debit');

  if (DOM.openCaseBtn) {
    DOM.openCaseBtn.disabled = true;
    DOM.openCaseBtn.textContent = 'Unlocking Case...';
  }
  if (DOM.showcaseOpenBtn) {
    DOM.showcaseOpenBtn.disabled = true;
  }
  if (DOM.backToCaseBtn) {
    DOM.backToCaseBtn.disabled = true;
  }

  // 3. Roll deterministic winner from Dreams & Nightmares Case
  const winningItem = openCase();
  state.activeWinningItem = winningItem;

  // 4. Instant Reset: Strip transform snapped back to 0px
  DOM.itemsStrip.style.transition = 'none';
  DOM.itemsStrip.style.transform = 'translateX(0px)';

  // 5. Populate fresh strip (Gold question mark masks special items)
  generateStrip(winningItem);

  // 6. Force synchronous reflow to register reset position
  void DOM.itemsStrip.offsetHeight;

  // 7. Measure target card and calculate exact translation
  const targetCard = DOM.itemsStrip.querySelector(`[data-index="${CONFIG.TARGET_INDEX}"]`);
  if (!targetCard) {
    console.error('Target card missing in DOM.');
    state.isSpinning = false;
    if (DOM.openCaseBtn) DOM.openCaseBtn.disabled = false;
    return;
  }

  const finalTranslateX = calculateTargetTranslateX(targetCard, DOM.caseViewport);

  // 8. Start deceleration audio ticker
  sfx.startReelTicking(CONFIG.ANIMATION_DURATION_SEC * 1000);

  // 9. Apply CSS transition
  DOM.itemsStrip.style.transition = `transform ${CONFIG.ANIMATION_DURATION_SEC}s ${CONFIG.TIMING_FUNCTION}`;
  DOM.itemsStrip.style.transform = `translateX(${finalTranslateX}px)`;

  // 10. Spin complete lifecycle
  const onTransitionEnd = (event) => {
    if (event.target !== DOM.itemsStrip || event.propertyName !== 'transform') {
      return;
    }

    DOM.itemsStrip.removeEventListener('transitionend', onTransitionEnd);
    sfx.stopReelTicking();

    // If winning item was a special knife, reveal the actual knife on the winning card!
    if (winningItem.rarity === 'Special') {
      const winnerCardEl = DOM.itemsStrip.querySelector(`[data-index="${CONFIG.TARGET_INDEX}"]`);
      if (winnerCardEl) {
        winnerCardEl.classList.remove('is-special-mystery');
        const img = winnerCardEl.querySelector('.item-image');
        const weaponEl = winnerCardEl.querySelector('.item-weapon');
        const nameEl = winnerCardEl.querySelector('.item-name');
        if (img) img.src = winningItem.image;
        if (weaponEl) weaponEl.textContent = winningItem.weapon;
        if (nameEl) nameEl.textContent = winningItem.name;
      }
    }

    // Reveal Victory Modal with actual unboxed item
    showVictoryModal(winningItem);

    // Update inline last unboxed summary
    if (DOM.winningItemContainer) {
      DOM.winningItemContainer.innerHTML = `
        <div class="win-display" style="border-color: ${winningItem.color}50; box-shadow: 0 8px 30px ${winningItem.color}20;">
          <div class="win-thumbnail" style="border-color: ${winningItem.color};">
            <img src="${winningItem.image}" alt="${winningItem.weapon} | ${winningItem.name}" />
          </div>
          <div class="win-details">
            <span class="win-subtitle">Last Unboxed</span>
            <h2 class="win-title">${winningItem.weapon} | ${winningItem.name}</h2>
            <span class="win-rarity" style="color: ${winningItem.color};">
              ${winningItem.rarity} ${winningItem.rarity === 'Special' ? '★' : ''} — $${(winningItem.price || 0).toFixed(2)}
            </span>
          </div>
        </div>
      `;
    }

    // Re-enable controls
    state.isSpinning = false;
    if (DOM.openCaseBtn) {
      DOM.openCaseBtn.disabled = false;
      DOM.openCaseBtn.textContent = `Unlock Again ($${CONFIG.CASE_COST.toFixed(2)})`;
    }
    if (DOM.showcaseOpenBtn) {
      DOM.showcaseOpenBtn.disabled = false;
    }
    if (DOM.backToCaseBtn) {
      DOM.backToCaseBtn.disabled = false;
    }
  };

  DOM.itemsStrip.addEventListener('transitionend', onTransitionEnd);
}

// ----------------------------------------------------------------------------
// MODULE 10: APP INITIALIZATION & EVENT LISTENERS
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Restore persistent state
  loadState();
  currentDisplayedBalance = state.balance;
  updateBalanceDisplay(state.balance);
  renderInventory();
  renderCaseGallery();

  // Button: Unlock Container from Showcase
  if (DOM.showcaseOpenBtn) {
    DOM.showcaseOpenBtn.addEventListener('click', startCaseRoll);
  }

  // Button: Unlock Again from Viewport
  if (DOM.openCaseBtn) {
    DOM.openCaseBtn.addEventListener('click', startCaseRoll);
  }

  // Button: Return to Case Showcase
  if (DOM.backToCaseBtn) {
    DOM.backToCaseBtn.addEventListener('click', switchToShowcase);
  }

  // Quick Deposit ($50)
  if (DOM.addFundsBtn) {
    DOM.addFundsBtn.addEventListener('click', () => {
      sfx.init();
      state.balance += CONFIG.DEPOSIT_AMOUNT;
      saveState();
      updateBalanceDisplay(state.balance, 'credit');
      sfx.playSell();
    });
  }

  // Clear Stash
  if (DOM.clearInvBtn) {
    DOM.clearInvBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset your unboxed inventory stash?')) {
        state.userInventory = [];
        saveState();
        renderInventory();
      }
    });
  }

  // Scroll to Inventory
  if (DOM.inventoryToggleBtn && DOM.inventorySection) {
    DOM.inventoryToggleBtn.addEventListener('click', () => {
      DOM.inventorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Victory Modal Actions
  if (DOM.modalKeepBtn) {
    DOM.modalKeepBtn.addEventListener('click', handleKeepItem);
  }

  if (DOM.modalSellBtn) {
    DOM.modalSellBtn.addEventListener('click', handleInstantSell);
  }

  if (DOM.modalSpinAgainBtn) {
    DOM.modalSpinAgainBtn.addEventListener('click', () => {
      if (state.activeWinningItem) {
        addToInventory(state.activeWinningItem);
      }
      closeVictoryModal();
      startCaseRoll();
    });
  }

  // Inventory Grid Sale Delegated Listener
  if (DOM.inventoryGrid) {
    DOM.inventoryGrid.addEventListener('click', (event) => {
      const sellBtn = event.target.closest('.inv-sell-btn');
      if (!sellBtn) return;

      const instanceId = sellBtn.getAttribute('data-instance-id');
      if (instanceId) {
        sellInventoryItem(instanceId);
      }
    });
  }

  // Dismiss modal when clicking backdrop
  if (DOM.victoryModal) {
    DOM.victoryModal.addEventListener('click', (e) => {
      if (e.target === DOM.victoryModal) {
        handleKeepItem();
      }
    });
  }
});
