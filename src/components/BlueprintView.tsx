import React from 'react';
import { Server, Database, Brain, Activity, Target, ShieldAlert, Cpu } from 'lucide-react';

export function BlueprintView() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tighter text-white">System Architecture & Design Blueprint</h1>
        <p className="text-xl text-slate-400">AI Trading Copilot — Global Strategy Discovery & Validation Platform</p>
        <div className="flex gap-2 pt-2">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-mono">Status: V1 Architecture</span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">Tier 1 Target: 6 Weeks</span>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Server className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-semibold text-slate-100">1. System Architecture (Detailed)</h2>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-sm overflow-x-auto text-slate-300 leading-relaxed shadow-lg">
{`[ Client Layer (React / Next.js) ]
       │ (REST / WebSockets)
       ▼
[ API Gateway & Orchestrator (Node.js/Express) ]
       │ ├── Auth & Rate Limiting
       │ ├── Strategy State Management
       │ └── Signal Delivery (WS)
       │
       ├──► [ LLM Layer ] ──> Gemini 3.1 Function Calling (Prompt -> JSON)
       │
       └──► [ Compute Layer (Python 3.11 / FastAPI) ]
              ├── NLP-to-Code Validator (Pydantic schemas)
              ├── Vectorized Backtest Engine (Pandas, VectorBT)
              └── Signal Aggregation Engine (Weighted Z-scores)
                     │
                     ▼
             [ Data Pipeline Layer ]
              ├── historical_data (TimescaleDB / Parquet)
              ├── live_feed (Kafka/Redis streams from Polygon/Binance)
              └── user_state (PostgreSQL)`}
        </div>
        <p className="text-slate-400 leading-relaxed">
          The architecture splits I/O handling from intensive compute. <strong>Node.js</strong> handles the fast APIs, Auth, and WebSocket pushing. <strong>Python</strong> is dedicated to numerical compute (vectorized backtesting) and data engineering. The <strong>LLM Layer</strong> sits isolated, converting human natural language into strictly enforced Pydantic/JSON schemas.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Cpu className="w-6 h-6 text-fuchsia-400" />
          <h2 className="text-2xl font-semibold text-slate-100">2. Core Module Design</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-medium text-slate-200 mb-3">A. NLP → Strategy Engine</h3>
            <ul className="text-slate-400 space-y-2 text-sm list-disc pl-4">
              <li><strong>Input:</strong> Free-form text (e.g., "RSI oversold crossover with MACD divergence on 1H BTC").</li>
              <li><strong>LLM Goal:</strong> Schema extraction. We use Gemini 3.1 Context Caching and Structured Outputs (JSON Schema) to guarantee valid types.</li>
              <li><strong>Validation:</strong> The LLM output is fed into a strict <code>Pydantic</code> parser. Unmapped indicators map to a default fallback or trigger a validation rejection prompt back to the LLM.</li>
            </ul>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-medium text-slate-200 mb-3">B. Backtesting Engine</h3>
            <ul className="text-slate-400 space-y-2 text-sm list-disc pl-4">
              <li><strong>Engine Choice:</strong> Strictly <em>Vectorized</em> (e.g., Pandas/Numpy operations via VectorBT) to achieve the &lt; 10s latency constraint. Event-driven testing in Python is too slow for web-scale discovery.</li>
              <li><strong>Output:</strong> Returns aggregated equity curve points (resampled to 100-300 points for frontend rendering), Sharpe, Max Drawdown, and Win Rate.</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-medium text-slate-200 mb-3">C. Historical Pattern Recognition</h3>
            <ul className="text-slate-400 space-y-2 text-sm list-disc pl-4">
              <li><strong>Regime Detection:</strong> Uses a Hidden Markov Model (HMM) or simple rolling volatility + moving average regimes (e.g., "High Vol Bullish", "Low Vol Range").</li>
              <li><strong>Matching:</strong> Dynamic Time Warping (DTW) on Z-score normalized price/volume windows to find historically similar setups.</li>
            </ul>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-medium text-slate-200 mb-3">D & E. Signals & Feedback Loop</h3>
            <ul className="text-slate-400 space-y-2 text-sm list-disc pl-4">
              <li><strong>Signal Aggregation:</strong> Computes continuous indicator values (-1.0 to 1.0) and uses a weighted sum to create a master "Conviction Score".</li>
              <li><strong>Learning Loop:</strong> Users log actual trades. The system calculates delta between Strategy Entry vs Actual Entry to detect FOMO, late entries, or premature exits (using Max Adverse Excursion / Max Favorable Excursion analysis).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Database className="w-6 h-6 text-emerald-400" />
          <h2 className="text-2xl font-semibold text-slate-100">3. Data Layer Design</h2>
        </div>
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-sm text-slate-300 space-y-4">
          <p><strong>Sources:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Equities: Polygon.io (Historical REST + live Websockets).</li>
            <li>Crypto: Binance / Coinbase CCXT wrappers for historical, direct WS for live tick data.</li>
          </ul>
          <p><strong>Storage:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>TimescaleDB</strong>: Core unified storage for OHLCV data. Continuous aggregates handle 1m, 5m, 1h, 1d rollups automatically.</li>
            <li><strong>Parquet / S3</strong>: Deep cold storage for rapid vectorized loading of multi-year backtests into memory.</li>
          </ul>
          <p><strong>Missing Data:</strong> Handled via Forward-Fill (ffill) across assets to prevent look-ahead bias, dropping assets with &gt;5% missing timestamps in an epoch.</p>
        </div>
      </section>


      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Brain className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-semibold text-slate-100">4. LLM Layer (Critical)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 font-mono text-[11px] overflow-hidden text-amber-300">
            {'// JSON Schema Enforced on LLM'}
            <br />
            {'{'}
            <br />
            {'  "universe": {"type": "array", "items": "str"},'}
            <br />
            {'  "indicators": ['}
            <br />
            {'    {'}
            <br />
            {'      "name": "string",'}
            <br />
            {'      "type": "rsi|macd|ema",'}
            <br />
            {'      "parameters": {"type": "object"}'}
            <br />
            {'    }'}
            <br />
            {'  ],'}
            <br />
            {'  "entry_logic": "string (Python eval safe)",'}
            <br />
            {'  "stop_loss_pct": "float"'}
            <br />
            {'}'}
          </div>
          <div className="text-sm text-slate-400 space-y-3 pt-2">
            <p><strong>Schema Enforcement:</strong> We enforce strict JSON generation using model API parameters. All 'logic' strings must resolve to known dataframe boolean series expressions (e.g., <code>df['rsi'] &lt; 30</code>).</p>
            <p><strong>Explainability:</strong> "Glass Box AI" involves a parallel prompt that takes the generated JSON and outputs a plain-english explanation of exactly what the strategy means, step-by-step. If they disagree, the run fails.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Target className="w-6 h-6 text-rose-400" />
          <h2 className="text-2xl font-semibold text-slate-100">5. MVP Scope (6 Weeks)</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-slate-900/50 p-6 rounded-xl border border-emerald-500/20">
            <h3 className="text-emerald-400 font-medium mb-3">DO (Must Have)</h3>
            <ul className="text-slate-300 space-y-2 text-sm list-disc pl-4">
              <li>NLP to strictly validated JSON logic mapper.</li>
              <li>Extremely fast vectorized Pandas/VectorBT Engine.</li>
              <li>Top 50 Crypto + Top 500 Equities support.</li>
              <li>Standard indicators (SMA, EMA, RSI, MACD, BBands).</li>
              <li>Performance visualization (Equity curve, Sharpe).</li>
            </ul>
          </div>
          <div className="flex-1 bg-slate-900/50 p-6 rounded-xl border border-rose-500/20">
            <h3 className="text-rose-400 font-medium mb-3">CUT (Nice to Have)</h3>
            <ul className="text-slate-400 space-y-2 text-sm list-disc pl-4">
              <li>Tick-level backtesting (too slow, requires C++ or massive parallelization).</li>
              <li>Live trade execution/brokerage integrations.</li>
              <li>Complex Machine Learning / Regime detection models.</li>
              <li>User behavior bias loop (post-trade).</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <Server className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold text-slate-100">6. API Design</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto shadow-md">
<pre>{`POST /api/v1/strategy/generate
{ "prompt": "Buy BTC when 4H RSI < 30 and price is above 200 EMA" }
=> Returns { id: "strat_123", strategy: StrategyJSON, explain: "..." }

POST /api/v1/backtest/run
{ "strategy_id": "strat_123", "start": "2020", "end": "2024", "capital": 10000 }
=> Returns { status: "success", metrics: { sharpe: 1.4... }, equity_curve: [...] }

GET /api/v1/signals/:strategy_id
=> Returns { current_position: null, latest_signal: "WAIT", triggers: [...] }`}</pre>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
          <ShieldAlert className="w-6 h-6 text-orange-400" />
          <h2 className="text-2xl font-semibold text-slate-100">8. Risks & Mitigations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-orange-400 font-medium mb-2 text-sm">LLM Hallucination</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Risk:</strong> AI generates rules that are un-parseable or mathematically impossible.<br /><br />
              <strong>Mitigation:</strong> Strong Pydantic data schemas. If parsing fails, use standard exception tracing to prompt the LLM once for an auto-fix, then fallback to user to adjust prompt.
            </p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-orange-400 font-medium mb-2 text-sm">Overfitting</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Risk:</strong> User keeps tweaking parameters until Sharpe is 5.0 on historical data, but it fails in live.<br /><br />
              <strong>Mitigation:</strong> Enforce Out-Of-Sample (OOS) data splits. Show a metric bridging 'In-Sample' vs 'Out-Sample' performance decay. Include transaction costs + slippage automatically.
            </p>
          </div>
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
            <h3 className="text-orange-400 font-medium mb-2 text-sm">Slow Backtests</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong>Risk:</strong> Vectorized backtests on 1m candles for 1500 assets exceed 30 seconds.<br /><br />
              <strong>Mitigation:</strong> Parquet memory-mapped stores (DuckDB or Polars). Aggressive slicing based on user's timeframe. Return degraded / sampled results after 10s timeout.
            </p>
          </div>
        </div>
      </section>
      
      <div className="pt-8 border-t border-slate-800">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">10x Startup Accelerator Recommendations</h3>
        <ul className="list-none space-y-4">
          <li className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-sm text-indigo-100/80">
            <strong className="text-indigo-300">Feature Shift: Playbook Trading.</strong> Instead of forcing the user to invent strategies from scratch, pivot slightly so the AI acts as a "Market Context Engine". The user asks: "How are momentum breakouts performing this week?", and the AI instances a <em>pre-coded</em> baseline playbook and backtests it dynamically on the last 3 months, offering an immediate edge rather than a build-it-yourself sandbox.
          </li>
          <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm text-emerald-100/80">
            <strong className="text-emerald-300">Community Validations.</strong> The product becomes 10x stickier if users can share generated strategies and see aggregate out-of-sample forward performance metrics via a global leaderboard.
          </li>
        </ul>
      </div>
    </div>
  );
}
