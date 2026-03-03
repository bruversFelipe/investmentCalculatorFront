export interface SimulationFormState {
  name: string;
  initialAmount: string;
  monthlyContribution: string;
  periodMonths: string;
  fixedAnnualRate: string;
  variableAnnualReturn: string;
  volatility: string;
  error: string | null;
}

export interface SimulationListItem {
  _id: string;
  name: string;
  createdAt: string;
}
