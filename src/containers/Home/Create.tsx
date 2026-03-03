import { useState } from "react";
import axios from "axios";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createSimulation } from "@/services/simulationService";
import { SimulationFormState } from "./types";

const initialFormState: SimulationFormState = {
  name: "",
  initialAmount: "",
  monthlyContribution: "",
  periodMonths: "",
  fixedAnnualRate: "",
  variableAnnualReturn: "",
  volatility: "",
  error: null,
};

interface CreateProps {
  onSuccess: () => void;
}

export default function Create({ onSuccess }: CreateProps) {
  const [formState, setFormState] = useState<SimulationFormState>(initialFormState);

  const onChange = (field: keyof SimulationFormState, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value, error: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, initialAmount, monthlyContribution, periodMonths, fixedAnnualRate, variableAnnualReturn, volatility } = formState;

    if (!name.trim()) {
      setFormState((prev) => ({ ...prev, error: "Nome da simulação é obrigatório" }));
      return;
    }

    const parsedInitialAmount = parseFloat(initialAmount);
    const parsedMonthlyContribution = parseFloat(monthlyContribution);
    const parsedPeriodMonths = parseInt(periodMonths, 10);
    const parsedFixedAnnualRate = parseFloat(fixedAnnualRate);
    const parsedVariableAnnualReturn = parseFloat(variableAnnualReturn);
    const parsedVolatility = parseFloat(volatility);

    if (isNaN(parsedInitialAmount) || parsedInitialAmount <= 0) {
      setFormState((prev) => ({ ...prev, error: "Valor inicial deve ser um número positivo" }));
      return;
    }

    if (isNaN(parsedMonthlyContribution) || parsedMonthlyContribution < 0) {
      setFormState((prev) => ({ ...prev, error: "Contribuição mensal deve ser um número não negativo" }));
      return;
    }

    if (isNaN(parsedPeriodMonths) || parsedPeriodMonths <= 0) {
      setFormState((prev) => ({ ...prev, error: "Período deve ser um número inteiro positivo" }));
      return;
    }

    if (isNaN(parsedFixedAnnualRate) || parsedFixedAnnualRate < 0) {
      setFormState((prev) => ({ ...prev, error: "Taxa anual fixa deve ser um número não negativo" }));
      return;
    }

    if (isNaN(parsedVariableAnnualReturn) || parsedVariableAnnualReturn < 0) {
      setFormState((prev) => ({ ...prev, error: "Retorno anual variável deve ser um número não negativo" }));
      return;
    }

    if (isNaN(parsedVolatility) || parsedVolatility < 0) {
      setFormState((prev) => ({ ...prev, error: "Volatilidade deve ser um número não negativo" }));
      return;
    }

    try {
      await createSimulation({
        name,
        initialAmount: parsedInitialAmount,
        monthlyContribution: parsedMonthlyContribution,
        periodMonths: parsedPeriodMonths,
        fixedAnnualRate: parsedFixedAnnualRate,
        variableAnnualReturn: parsedVariableAnnualReturn,
        volatility: parsedVolatility,
      });

      setFormState(initialFormState);
      onSuccess();
    } catch (err: unknown) {
      let message = "Erro desconhecido";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setFormState((prev) => ({ ...prev, error: `Erro: ${message}` }));
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Nova Simulação
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Nome da Simulação"
          type="text"
          value={formState.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
          placeholder="Ex: Investimento 2024"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Valor Inicial (R$)"
            type="number"
            step="0.01"
            value={formState.initialAmount}
            onChange={(e) => onChange("initialAmount", e.target.value)}
            required
            placeholder="10000"
          />

          <Input
            label="Contribuição Mensal (R$)"
            type="number"
            step="0.01"
            value={formState.monthlyContribution}
            onChange={(e) => onChange("monthlyContribution", e.target.value)}
            required
            placeholder="500"
          />
        </div>

        <Input
          label="Período (meses)"
          type="number"
          value={formState.periodMonths}
          onChange={(e) => onChange("periodMonths", e.target.value)}
          required
          placeholder="12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            label="Taxa Anual Fixa (%)"
            type="number"
            step="0.01"
            value={formState.fixedAnnualRate}
            onChange={(e) => onChange("fixedAnnualRate", e.target.value)}
            required
            placeholder="12"
          />

          <Input
            label="Retorno Anual Variável (%)"
            type="number"
            step="0.01"
            value={formState.variableAnnualReturn}
            onChange={(e) => onChange("variableAnnualReturn", e.target.value)}
            required
            placeholder="15"
          />

          <Input
            label="Volatilidade (%)"
            type="number"
            step="0.01"
            value={formState.volatility}
            onChange={(e) => onChange("volatility", e.target.value)}
            required
            placeholder="20"
          />
        </div>

        {formState.error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {formState.error}
          </p>
        )}

        <Button type="submit" fullWidth>
          Criar Simulação
        </Button>
      </form>
    </div>
  );
}
