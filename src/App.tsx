import { useState, useEffect } from 'react';
import { CASE_ITEMS, RARITY_CONFIG, openCase, runConsoleTest } from './caseLogic.js';

export default function App() {
  const [lastRolledItem, setLastRolledItem] = useState<any>(null);
  const [simulationResults, setSimulationResults] = useState<any[]>([]);
  const [simulating, setSimulating] = useState(false);
  const [totalRolls, setTotalRolls] = useState(10000);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // Run an initial console test on mount as specified in requirements
  useEffect(() => {
    runConsoleTest(10000);
  }, []);

  const handleSingleRoll = () => {
    const item = openCase();
    setLastRolledItem(item);
    console.log('[CS2 RNG Engine] Manual Single Roll Result:', item);
  };

  const handleRunSimulation = (iterations: number) => {
    setSimulating(true);
    setTotalRolls(iterations);
    // Use requestAnimationFrame / setTimeout so UI shows loading state
    setTimeout(() => {
      const { resultsTable, durationMs } = runConsoleTest(iterations);
      setSimulationResults(resultsTable);
      setExecutionTime(durationMs);
      setSimulating(false);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono p-6 selection:bg-neutral-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="border-b border-neutral-800 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">Stage 1: Core Architecture</span>
              <h1 className="text-2xl font-bold text-neutral-50 tracking-tight mt-1">
                CS2 Case Opening — Mathematical RNG Engine
              </h1>
            </div>
            <span className="px-2.5 py-1 text-xs rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
              Pure ES6+ Engine
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-2">
            Discrete probability model using realistic Valve drop rates and Cumulative Distribution Function (CDF) sampling.
          </p>
        </header>

        {/* Target Probabilities Grid */}
        <section className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-5">
          <h2 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-4">
            Official CS2 Drop Rate Distribution
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.values(RARITY_CONFIG).map((tier: any) => (
              <div 
                key={tier.name}
                className="p-3 rounded border border-neutral-800 bg-neutral-950/70 relative overflow-hidden"
                style={{ borderLeftColor: tier.color, borderLeftWidth: '4px' }}
              >
                <div className="text-xs font-semibold text-neutral-300">{tier.name}</div>
                <div className="text-lg font-bold text-neutral-100 mt-0.5">{tier.weight}%</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">
                  {tier.name === 'Special' ? 'Knife / Gloves' : `1 in ${Math.round(100 / tier.weight)}`}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Testing Controls */}
        <section className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Interactive Test Bench
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Trigger single rolls or run Monte Carlo statistical convergence tests.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSingleRoll}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold rounded border border-neutral-700 transition cursor-pointer"
              >
                Roll 1 Skin
              </button>
              <button
                disabled={simulating}
                onClick={() => handleRunSimulation(10000)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-neutral-950 text-xs font-semibold rounded transition cursor-pointer"
              >
                {simulating ? 'Simulating...' : 'Test 10,000 Rolls'}
              </button>
              <button
                disabled={simulating}
                onClick={() => handleRunSimulation(100000)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-100 text-xs font-semibold rounded border border-neutral-700 transition cursor-pointer"
              >
                Test 100,000 Rolls
              </button>
            </div>
          </div>

          {/* Last Rolled Item Preview */}
          {lastRolledItem && (
            <div className="mt-5 p-4 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded flex items-center justify-center font-bold text-sm border"
                  style={{ borderColor: lastRolledItem.color, color: lastRolledItem.color }}
                >
                  ★
                </div>
                <div>
                  <div className="text-xs text-neutral-400">{lastRolledItem.weapon}</div>
                  <div className="text-base font-bold text-neutral-100">{lastRolledItem.name}</div>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: lastRolledItem.color }}>
                    {lastRolledItem.rarity}
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-neutral-500">
                <div>ID: {lastRolledItem.id}</div>
                <div className="text-emerald-400 mt-1">Rolled via openCase()</div>
              </div>
            </div>
          )}
        </section>

        {/* Statistical Convergence Results Table */}
        {simulationResults.length > 0 && (
          <section className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Monte Carlo Empirical Verification ({totalRolls.toLocaleString()} rolls)
              </h2>
              {executionTime !== null && (
                <span className="text-xs text-neutral-500">Computed in {executionTime.toFixed(1)}ms</span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400">
                    <th className="py-2 px-3 font-semibold">Rarity Tier</th>
                    <th className="py-2 px-3 font-semibold">Observed Drops</th>
                    <th className="py-2 px-3 font-semibold">Empirical Drop Rate</th>
                    <th className="py-2 px-3 font-semibold">Theoretical Drop Rate</th>
                    <th className="py-2 px-3 font-semibold">Statistical Deviation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {simulationResults.map((row: any) => (
                    <tr key={row['Rarity']} className="hover:bg-neutral-800/20">
                      <td className="py-2 px-3 font-semibold text-neutral-200">{row['Rarity']}</td>
                      <td className="py-2 px-3 text-neutral-300">{row['Drops']}</td>
                      <td className="py-2 px-3 font-bold text-neutral-100">{row['Empirical %']}</td>
                      <td className="py-2 px-3 text-neutral-400">{row['Expected %']}</td>
                      <td className="py-2 px-3 text-emerald-400">{row['Deviation']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-neutral-500 mt-3">
              Check browser Developer Tools console (<code className="text-neutral-400">Ctrl+Shift+I</code> or <code className="text-neutral-400">Cmd+Option+I</code>) to inspect formatted <code className="text-neutral-400">console.table()</code> and verbose object structures.
            </p>
          </section>
        )}

        {/* Item Pool Schema Reference */}
        <section className="bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Item Pool Definition ({CASE_ITEMS.length} configured items)
            </h2>
            <span className="text-xs text-neutral-500">CASE_ITEMS schema</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
            {CASE_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="p-2.5 rounded bg-neutral-950 border border-neutral-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="text-neutral-200 font-medium">{item.weapon} | {item.name}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: item.color }}>{item.rarity}</div>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono">{item.id}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
