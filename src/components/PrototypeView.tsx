import React, { useState } from 'react';
import { Play, Code, AreaChart, Settings2, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mockEquityCurve = [
  { date: '2023-01', value: 10000, bench: 10000 },
  { date: '2023-02', value: 10200, bench: 9800 },
  { date: '2023-03', value: 9900,  bench: 9500 },
  { date: '2023-04', value: 10500, bench: 10100 },
  { date: '2023-05', value: 11200, bench: 10300 },
  { date: '2023-06', value: 10800, bench: 10500 },
  { date: '2023-07', value: 11500, bench: 11000 },
  { date: '2023-08', value: 12100, bench: 10800 },
  { date: '2023-09', value: 11900, bench: 10600 },
  { date: '2023-10', value: 12500, bench: 11200 },
  { date: '2023-11', value: 13200, bench: 11500 },
  { date: '2023-12', value: 14100, bench: 12100 },
];

const mockStrategyJson = {
  asset: "BTC/USDT",
  indicators: [
    { type: "RSI", period: 14 },
    { type: "VOL_MA", spike: 1.2 }
  ],
  risk: { tp: 0.05, sl: 0.02 }
};

type AppState = 'IDLE' | 'GENERATING' | 'REVIEW' | 'BACKTESTING' | 'RESULTS';

export function PrototypeView() {
  const [prompt, setPrompt] = useState('Long BTC when RSI(14) < 30 on 1h timeframe, confirmed by 24h volume spike of > 20% against moving average. Exit at 5% profit or 2% stop loss.');
  const [appState, setAppState] = useState<AppState>('IDLE');

  const handleGenerate = () => {
    if (!prompt) return;
    setAppState('GENERATING');
    setTimeout(() => {
      setAppState('REVIEW');
    }, 1500);
  };

  const handleBacktest = () => {
    setAppState('BACKTESTING');
    setTimeout(() => {
      setAppState('RESULTS');
    }, 2000);
  };

  return (
    <div className="w-full h-full grid grid-cols-[320px_1fr_280px] gap-[1px] bg-zinc-800">
      
      {/* Col 1: Strategy Composer */}
      <section className="bg-bg-base p-5 flex flex-col h-full overflow-y-auto">
        <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3">Strategy Composer</div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={appState !== 'IDLE' && appState !== 'REVIEW' && appState !== 'RESULTS'}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white text-sm h-[120px] resize-none mb-4 focus:outline-none focus:border-accent"
          placeholder="Enter trading idea..."
        />
        
        <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3">
          {appState === 'IDLE' ? 'LLM Translation [Pending]' : 'LLM Translation [JSON]'}
        </div>
        
        <div className="bg-[#000] border border-[#333] p-3 rounded-md text-[12px] font-mono text-success flex-1 overflow-auto mb-4">
          {appState === 'IDLE' || appState === 'GENERATING' ? (
             <div className="text-[#333]">Awaiting translation...</div>
          ) : (
             <pre>{JSON.stringify(mockStrategyJson, null, 2)}</pre>
          )}
        </div>

        <button
          onClick={appState === 'REVIEW' ? handleBacktest : handleGenerate}
          disabled={appState === 'GENERATING' || appState === 'BACKTESTING' || appState === 'RESULTS'}
          className="bg-white text-black font-extrabold p-[14px] text-center uppercase text-[13px] tracking-[1px] rounded flex items-center justify-center gap-2 mt-auto hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {appState === 'GENERATING' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Compiling...</>
          ) : appState === 'BACKTESTING' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Simulating...</>
          ) : appState === 'RESULTS' ? (
            "Complete"
          ) : appState === 'REVIEW' ? (
            "Validate & Backtest"
          ) : (
            "Translate & Build"
          )}
        </button>
      </section>

      {/* Col 2: Performance Discovery */}
      <section className="bg-bg-base p-5 flex flex-col h-full overflow-hidden">
        <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3">Performance Discovery</div>
        
        {(appState === 'IDLE' || appState === 'GENERATING' || appState === 'REVIEW' || appState === 'BACKTESTING') ? (
           <div className="flex-1 flex items-center justify-center border border-dashed border-[#333] rounded-xl text-[#71717a] text-sm">
             {appState === 'BACKTESTING' ? <Loader2 className="w-8 h-8 animate-spin text-accent" /> : "Run backtest to view performance"}
           </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border-l-2 border-accent pl-3">
                <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-1">Sharpe Ratio</div>
                <div className="text-[32px] font-extrabold tracking-[-1px]">2.84</div>
              </div>
              <div className="border-l-2 border-accent pl-3">
                <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-1">Max Drawdown</div>
                <div className="text-[32px] font-extrabold tracking-[-1px] text-danger">-8.2%</div>
              </div>
              <div className="border-l-2 border-accent pl-3">
                <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-1">Win Rate</div>
                <div className="text-[32px] font-extrabold tracking-[-1px]">64.5%</div>
              </div>
              <div className="border-l-2 border-accent pl-3">
                <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-1">Total Trades</div>
                <div className="text-[32px] font-extrabold tracking-[-1px]">142</div>
              </div>
            </div>
            
            <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3">Equity Curve (Historical Validation)</div>
            <div className="flex-1 border border-dashed border-[#333] rounded-xl p-3 relative h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={mockEquityCurve} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} dx={-10} domain={['dataMin - 1000', 'dataMax + 1000']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '4px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" name="Strategy" stroke="var(--color-accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </section>

      {/* Col 3: Decision Intelligence */}
      <section className="bg-bg-base p-5 flex flex-col h-full overflow-y-auto">
        <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3 shrink-0">Decision Intelligence</div>
        
        <div className="flex justify-between items-center py-2 border-b border-zinc-800 text-[13px] shrink-0">
          <span>RSI Threshold</span>
          <span className="font-mono text-success">VALID</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-zinc-800 text-[13px] shrink-0">
          <span>Volume Anomaly</span>
          <span className="font-mono text-[#71717a]">PENDING</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-zinc-800 text-[13px] shrink-0">
          <span>Trend Regime</span>
          <span className="font-mono text-[#ffffff]">BULLISH</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-zinc-800 text-[13px] shrink-0">
          <span>Liquidity Depth</span>
          <span className="font-mono text-success">HIGH</span>
        </div>

        <div className="mt-6 shrink-0">
          <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3 flex items-center justify-between">
            <span>Glass Box Translation</span>
            {(appState === 'REVIEW' || appState === 'BACKTESTING' || appState === 'RESULTS') && (
              <span className="bg-accent/20 text-accent border border-accent/20 px-1.5 py-0.5 rounded text-[9px]">GENERATED</span>
            )}
          </div>
          
          {(appState === 'IDLE' || appState === 'GENERATING') ? (
            <div className="text-[13px] text-[#71717a] border border-dashed border-[#333] rounded p-4 text-center">
               Human-readable explanation will appear after AI generation.
            </div>
          ) : (
            <div className="space-y-3">
              {[
                {
                  title: "Market Universe",
                  text: `Targets ${mockStrategyJson.asset} for execution within the specified timeframe.`
                },
                {
                  title: "Signal Engine",
                  text: `Evaluates market state using a ${mockStrategyJson.indicators[0].period}-period ${mockStrategyJson.indicators[0].type} to measure momentum saturation, combined with a ${mockStrategyJson.indicators[1].type} detector triggering on a ${mockStrategyJson.indicators[1].spike}x relative surge.`
                },
                {
                  title: "Entry Logic",
                  text: `Simulates a LONG position historically when momentum depletion logically aligns with institutional conviction.`
                },
                {
                  title: "Risk Constraints",
                  text: `Strictly enforces a ${(mockStrategyJson.risk.tp * 100).toFixed(0)}% Take Profit ceiling and a ${(mockStrategyJson.risk.sl * 100).toFixed(0)}% Stop-Loss floor to limit downside exposure.`
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                  <div className="text-accent font-bold text-[11px] uppercase tracking-wider mb-1.5 flex gap-2 items-center">
                    <span className="bg-accent text-[#000] w-[18px] h-[18px] inline-flex justify-center items-center rounded-full text-[10px] leading-none shrink-0">{idx + 1}</span>
                    <span className="truncate">{step.title}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#d4d4d8] pl-[26px]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 shrink-0">
          <div className="text-[11px] uppercase tracking-[0.1em] text-[#71717a] font-semibold mb-3">Agent Insights</div>
          <p className="text-[13px] leading-[1.6] text-[#a1a1aa] bg-zinc-900/50 p-3 rounded-lg border-l-2 border-[#71717a]">
            High correlation detected with SPY early session movements. Suggesting a 0.5% offset on entry to avoid fake-outs during high-volatility opens.
          </p>
        </div>

        <div className="mt-8 pt-5 border-t border-zinc-800 text-[11px] text-[#71717a] shrink-0">
          <div className="mb-1">System Architecture: v2.4.0</div>
          <div>Pipeline: Polygon.io + Binance Global</div>
        </div>
      </section>
    </div>
  );
}
