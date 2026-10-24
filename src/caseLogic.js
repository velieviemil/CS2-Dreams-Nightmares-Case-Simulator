/**
 * ============================================================================
 * CS2 CASE OPENING SIMULATION - DREAMS & NIGHTMARES CASE REPOSITORY
 * ============================================================================
 * 
 * Official Valve CS2 Drop Rate Distribution:
 * - Mil-Spec (Blue): ~79.92%
 * - Restricted (Purple): ~15.98%
 * - Classified (Pink): ~3.19%
 * - Covert (Red): ~0.64%
 * - Special / Gold (Knives): ~0.26%
 * 
 * All asset links are direct official Steam / Valve Akamai CDN images
 * sourced from the Dreams & Nightmares Case collection.
 * ============================================================================
 */

export const RARITY_CONFIG = {
  MIL_SPEC: {
    name: 'Mil-Spec',
    color: '#4b69ff', // CS2 Blue
    weight: 79.92
  },
  RESTRICTED: {
    name: 'Restricted',
    color: '#8847ff', // CS2 Purple
    weight: 15.98
  },
  CLASSIFIED: {
    name: 'Classified',
    color: '#d32ce6', // CS2 Pink
    weight: 3.19
  },
  COVERT: {
    name: 'Covert',
    color: '#eb4b4b', // CS2 Red
    weight: 0.64
  },
  SPECIAL: {
    name: 'Special',
    color: '#ffd700', // CS2 Gold
    weight: 0.26
  }
};

// Official CS2 Dreams & Nightmares Case Crate Icon
export const DREAMS_CASE_METADATA = {
  id: 'crate-dreams-and-nightmares',
  name: 'Dreams & Nightmares Case',
  series: 'Community Weapon Case Series #33',
  cost: 2.50,
  image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnIV7Kb5OaU-JqfHDzXFle0u4LY8Gy_kkRgisGzcm4v4J3vDOAQmDMdyRvlK7EcmeCU3yw'
};

// Classic Gold CS2 Exceedingly Rare Special Item Logo
export const GOLD_QUESTION_MARK_IMAGE = '/assets/aistudio/special-item_1bba529c.png';

// ----------------------------------------------------------------------------
// OFFICIAL DREAMS & NIGHTMARES CASE DROP POOL
// ----------------------------------------------------------------------------
export const CASE_ITEMS = [
  // --- Mil-Spec Grade (Blue: $0.18 - $0.35) ---
  {
    id: 'skin-dnc-01',
    name: 'Scrawl',
    weapon: 'Five-SeveN',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.25,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-BlXyGyqhIqtjqEpYPwJiPTcAInA5J0FO9csBSww4bhZruzswLcjIsXmCusjCsbuno_57tXUqB386HJz1aW2pI_m5Q'
  },
  {
    id: 'skin-dnc-02',
    name: 'Ensnared',
    weapon: 'MAC-10',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.30,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DB3-ZxNF6ueZhW2fikB935ziGztj7JHyQbgIkWZsmFrJY4xTpwdOzP-Oz7laNj4lFyy2tkGoXudbL5uIf'
  },
  {
    id: 'skin-dnc-03',
    name: 'Foresight',
    weapon: 'MAG-7',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.22,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5G3wiFO0P-vb_NSMOKWCm6T1eFkj-1gSCGn2xgmsWvRm96seXOfbFMjXJR1R-NY4xjukNLlYurn4QeN3t5CmCT7jHxXrnE8UENGXls'
  },
  {
    id: 'skin-dnc-04',
    name: 'Necro Jr.',
    weapon: 'MP5-SD',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.35,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsPz-R1c_M2jePFSK_mXMWmVwvx5vu5kRiq8myIrujqNjsH8JXqXPVAhDZVyR7YO4ETrxtLvZbmxtAXfiIpCzHr5h3tB635j4-gCT-N7reJfmdfh'
  },
  {
    id: 'skin-dnc-05',
    name: 'Lifted Spirits',
    weapon: 'P2000',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.28,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_K8-VAn6Zz-lJtPNsTiSMmRQguynLydatcHrEOgIhXJZxReINtRO7ltexZuiwtQPd34lFxXqqjisYun444fFCD_R1ajI6RQ'
  },
  {
    id: 'skin-dnc-06',
    name: 'Poultrygeist',
    weapon: 'SCAR-20',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.18,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLinZfyr3Jk_OKRe6dsMs-QBm6Tyut4tuhuRz2MmRQguynLno2pdnnGOw9xWcFwEbMCtkHsmoXuNe23tVGNiINCyyv6iylJuyZi5_FCD_Tlwp1EIg'
  },
  {
    id: 'skin-dnc-07',
    name: 'Spirit Board',
    weapon: 'Sawed-Off',
    rarity: RARITY_CONFIG.MIL_SPEC.name,
    color: RARITY_CONFIG.MIL_SPEC.color,
    price: 0.20,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F5pehjTha_nBovp3OEyN-ocCmWPwYkCpoiE-QMt0bsxNbnNLm25waK345DyST23CpP5ytp_a9cBm4mGqdG'
  },

  // --- Restricted (Purple: $1.90 - $4.20) ---
  {
    id: 'skin-dnc-08',
    name: 'Space Cat',
    weapon: 'PP-Bizon',
    rarity: RARITY_CONFIG.RESTRICTED.name,
    color: RARITY_CONFIG.RESTRICTED.color,
    price: 2.10,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-AHmaTxO13pN5lRi67gVN04jvcmYv6IHnGbw51XsYmQO5ftBG9xoexNrix4gPYjIJEzX_2iX9I8G81tOIzQC5J'
  },
  {
    id: 'skin-dnc-09',
    name: 'Dream Glade',
    weapon: 'G3SG1',
    rarity: RARITY_CONFIG.RESTRICTED.name,
    color: RARITY_CONFIG.RESTRICTED.color,
    price: 1.90,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2zYXnrB1Y-s2pO7dqcc-UAmaUxNF6ueZhW2e3wkl162TVmdqvd3mUPw9yDJZ4FOYJ4UKxkNfiNrvn4QCMjdlHmHj6kGoXub9gXKkW'
  },
  {
    id: 'skin-dnc-10',
    name: 'Night Terror',
    weapon: 'M4A1-S',
    rarity: RARITY_CONFIG.RESTRICTED.name,
    color: RARITY_CONFIG.RESTRICTED.color,
    price: 4.20,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9lj-hnXCa-mxQmjDGMnYftby3FPFVxA5ZwRecOtUXuxtPiNL_jsQLc2NkTzS38jC5L7ydj5u8EUKo7uvqAgGSM4LM'
  },
  {
    id: 'skin-dnc-11',
    name: 'Zombie Offensive',
    weapon: 'XM1014',
    rarity: RARITY_CONFIG.RESTRICTED.name,
    color: RARITY_CONFIG.RESTRICTED.color,
    price: 2.50,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7v-RcKlSOv-eDG6V_uFwtuRnXCClkCIrujqNjsGqdnzEOFUjW5omROQNt0LuwNKyYeKwslfYiN0Qmyr83Hsd6iZj5esAT-N7rRccpDyZ'
  },
  {
    id: 'skin-dnc-12',
    name: 'Ticket to Hell',
    weapon: 'USP-S',
    rarity: RARITY_CONFIG.RESTRICTED.name,
    color: RARITY_CONFIG.RESTRICTED.color,
    price: 3.80,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_vp5j-lsQyWMmRQguynLzt_8JXiVOwF2AsF4R-ECshftltKxZe6x41CKjotExST8jn8f7ilr5PFCD_TZVvgG5g'
  },

  // --- Classified (Pink: $14.00 - $18.00) ---
  {
    id: 'skin-dnc-13',
    name: 'Melondrama',
    weapon: 'Dual Berettas',
    rarity: RARITY_CONFIG.CLASSIFIED.name,
    color: RARITY_CONFIG.CLASSIFIED.color,
    price: 14.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2rZK15JeOsDGKHwPxzj-1gSCGn20t_5TiBmdf9Jy-QaQIiW5F1E-BesxG9lIaxNuLj41He340Ryi79ii5XrnE8Xl7Qhlk'
  },
  {
    id: 'skin-dnc-14',
    name: 'Rapid Eye Movement',
    weapon: 'FAMAS',
    rarity: RARITY_CONFIG.CLASSIFIED.name,
    color: RARITY_CONFIG.CLASSIFIED.color,
    price: 16.50,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-BD3eZxdFzqeR6cCW6khUz_WjRmN79JXmePABxDsB1QeZetxnqx9XhN-nk4A3f399CzX2qiCsa7yd1o7FVINiMH98'
  },
  {
    id: 'skin-dnc-15',
    name: 'Abyssal Apparition',
    weapon: 'MP7',
    rarity: RARITY_CONFIG.CLASSIFIED.name,
    color: RARITY_CONFIG.CLASSIFIED.color,
    price: 18.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf_jdk4uL5V6JoIeKsAm6Xyfo45uc9GnnnzBh-5zzTw9n9I3mQPAEgD5YlFuIOthC6wNK1MeKwsgHeiZUFk3vcOiyhPQ'
  },

  // --- Covert (Red: $65.00 - $85.00) ---
  {
    id: 'skin-dnc-16',
    name: 'Nightwish',
    weapon: 'AK-47',
    rarity: RARITY_CONFIG.COVERT.name,
    color: RARITY_CONFIG.COVERT.color,
    price: 85.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4'
  },
  {
    id: 'skin-dnc-17',
    name: 'Starlight Protector',
    weapon: 'MP9',
    rarity: RARITY_CONFIG.COVERT.name,
    color: RARITY_CONFIG.COVERT.color,
    price: 65.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V7d5IeKfB2CY1dF6ueZhW2flkUtztz_SzYypJSqRalUhDJNwQO4PsBXtx9HkN-K37w3bgohGmHn3kGoXuZ3lRdvF'
  },

  // --- Special / Knives (Gold: $480.00 - $1,550.00) ---
  {
    id: 'skin-dnc-knife-01',
    name: 'Gamma Doppler',
    weapon: '★ Butterfly Knife',
    rarity: RARITY_CONFIG.SPECIAL.name,
    color: RARITY_CONFIG.SPECIAL.color,
    price: 1550.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvxONzouBlSxa-lA8lvziMgIr9HifOOV5kFJp2Ee9b4Rntm4GxY7_ntQHc2o1DmH6r3Hgcv3w4t-pXU6ZzrPHQjQnfcepq0dwfRJw'
  },
  {
    id: 'skin-dnc-knife-02',
    name: 'Lore',
    weapon: '★ Butterfly Knife',
    rarity: RARITY_CONFIG.SPECIAL.name,
    color: RARITY_CONFIG.SPECIAL.color,
    price: 1350.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsDXKvw_tipOR7SSWqqhEooTi6lob-KT-JZw90XJMiTO8PukW4wIXmN-zq5gXf2tpBm37_2y4auylv5exUAKAi_7qX0V8Ly4BE2w'
  },
  {
    id: 'skin-dnc-knife-03',
    name: 'Gamma Doppler',
    weapon: '★ Bowie Knife',
    rarity: RARITY_CONFIG.SPECIAL.name,
    color: RARITY_CONFIG.SPECIAL.color,
    price: 480.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-uC4YbJsLM-RAXCZxNF3vd5sQiyhlBEjjDCEiI31JCLdO1JPVssnHaMU4EG-ltyyPuLq5gHYj9lMzyz7hyxNuCs-5OoDVKImrKTe21mXZ-Zu5I5Deqhh5Zn_hA'
  }
];

// Pre-grouped lookup index for fast filtering
const ITEMS_BY_RARITY = Object.values(RARITY_CONFIG).reduce((acc, config) => {
  acc[config.name] = CASE_ITEMS.filter(item => item.rarity === config.name);
  return acc;
}, {});

/**
 * Rolls a random rarity tier using Cumulative Distribution Function (CDF).
 * @returns {string} The winning rarity tier name
 */
export function rollRarity() {
  const roll = Math.random() * 100;

  const tiers = [
    RARITY_CONFIG.SPECIAL,     // 0.26%  -> [0.00, 0.26)
    RARITY_CONFIG.COVERT,      // 0.64%  -> [0.26, 0.90)
    RARITY_CONFIG.CLASSIFIED,  // 3.19%  -> [0.90, 4.09)
    RARITY_CONFIG.RESTRICTED,  // 15.98% -> [4.09, 20.07)
    RARITY_CONFIG.MIL_SPEC     // 79.92% -> [20.07, 100.00)
  ];

  let cumulativeWeight = 0;

  for (const tier of tiers) {
    cumulativeWeight += tier.weight;
    if (roll < cumulativeWeight) {
      return tier.name;
    }
  }

  return RARITY_CONFIG.MIL_SPEC.name;
}

/**
 * Simulates opening a single case and returns the won item.
 * @param {Array<Object>} [itemsPool=CASE_ITEMS]
 * @returns {Object}
 */
export function openCase(itemsPool = CASE_ITEMS) {
  const selectedRarity = rollRarity();
  const availableItems = itemsPool.filter(item => item.rarity === selectedRarity);

  if (!availableItems || availableItems.length === 0) {
    throw new Error(`Item pool error: No items for rarity "${selectedRarity}".`);
  }

  const randomIndex = Math.floor(Math.random() * availableItems.length);
  return availableItems[randomIndex];
}

/**
 * Monte Carlo Simulation / Statistical Verification Test Script.
 * @param {number} iterations - Number of simulated case openings
 */
export function runConsoleTest(iterations = 10000) {
  const counts = {
    [RARITY_CONFIG.MIL_SPEC.name]: 0,
    [RARITY_CONFIG.RESTRICTED.name]: 0,
    [RARITY_CONFIG.CLASSIFIED.name]: 0,
    [RARITY_CONFIG.COVERT.name]: 0,
    [RARITY_CONFIG.SPECIAL.name]: 0
  };

  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    const item = openCase();
    counts[item.rarity]++;
  }
  const durationMs = Date.now() - startTime;

  const resultsTable = Object.values(RARITY_CONFIG).map(config => {
    const drops = counts[config.name] || 0;
    const empirical = (drops / iterations) * 100;
    const deviation = empirical - config.weight;

    return {
      'Rarity': config.name,
      'Drops': drops.toLocaleString(),
      'Empirical %': `${empirical.toFixed(3)}%`,
      'Expected %': `${config.weight.toFixed(2)}%`,
      'Deviation': `${deviation >= 0 ? '+' : ''}${deviation.toFixed(3)}%`
    };
  });

  return { counts, resultsTable, durationMs };
}
