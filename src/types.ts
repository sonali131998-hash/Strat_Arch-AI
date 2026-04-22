export interface GeneratedStrategy {
  name: string;
  description: string;
  universe: {
    assets: string[];
    assetClass: "crypto" | "equities" | "mixed";
  };
  timeframe: string;
  indicators: {
    name: string;
    type: string;
    parameters: Record<string, number | string>;
  }[];
  entryConditions: {
    rule: string;
    logic: string; // Machine-readable logic
  }[];
  exitConditions: {
    rule: string;
    logic: string;
    takeProfit?: number;
    stopLoss?: number;
  }[];
  positionSizing: {
    type: string;
    value: number;
  };
}

export interface BacktestResult {
  metrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    totalTrades: number;
  };
  equityCurve: {
    date: string;
    value: number;
    benchmark: number;
  }[];
  recentTrades: {
    date: string;
    asset: string;
    type: "LONG" | "SHORT";
    pnl: number;
  }[];
}
