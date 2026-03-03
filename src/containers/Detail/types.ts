export interface MonthlyEvolution {
  month: number;
  value: number;
}

export interface FixedIncomeResults {
  finalAmount: number;
  totalInvested: number;
  grossProfit: number;
  netProfit: number;
  ir: number;
  iof: number;
  monthlyEvolution: MonthlyEvolution[];
}

export interface VariableIncomeResults {
  finalAmount: number;
  totalInvested: number;
  grossProfit: number;
  monthlyEvolution: MonthlyEvolution[];
}

export interface SimulationDetail {
  _id: string;
  name: string;
  initialAmount: number;
  monthlyContribution: number;
  periodMonths: number;
  fixedAnnualRate: number;
  variableAnnualReturn: number;
  volatility: number;
  results: {
    fixedIncome: FixedIncomeResults;
    variableIncome: VariableIncomeResults;
    comparison: {
      differencePercent: number;
    };
  };
  createdAt: string;
}
