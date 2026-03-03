"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/authAtom";
import { getSimulation } from "@/services/simulationService";
import { SimulationDetail } from "./types";

export default function DetailContainer() {
  const [simulation, setSimulation] = useState<SimulationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [token] = useAtom(tokenAtom);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const fetchSimulation = async () => {
    if (!id) {
      setError("ID da simulação não encontrado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getSimulation(id);
      if (response.success && response.data) {
        setSimulation(response.data);
      } else {
        setError(response.message || "Erro ao carregar simulação");
      }
    } catch (err) {
      console.error("Failed to fetch simulation:", err);
      setError("Erro ao carregar simulação");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulation();
  }, [id]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Carregando...</p>
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Simulação não encontrada"}</p>
          <button
            onClick={handleBack}
            className="bg-slate-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-800 transition duration-200"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="text-slate-600 hover:text-slate-800 mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <h1 className="text-3xl font-semibold text-slate-800">
            {simulation.name}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Criado em: {formatDate(simulation.createdAt)}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Parâmetros da Simulação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Valor Inicial</p>
              <p className="text-lg font-medium text-slate-800">
                {formatCurrency(simulation.initialAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Contribuição Mensal</p>
              <p className="text-lg font-medium text-slate-800">
                {formatCurrency(simulation.monthlyContribution)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Período</p>
              <p className="text-lg font-medium text-slate-800">
                {simulation.periodMonths} meses
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Taxa Anual Fixa</p>
              <p className="text-lg font-medium text-slate-800">
                {formatPercent(simulation.fixedAnnualRate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Retorno Anual Variável</p>
              <p className="text-lg font-medium text-slate-800">
                {formatPercent(simulation.variableAnnualReturn)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Volatilidade</p>
              <p className="text-lg font-medium text-slate-800">
                {formatPercent(simulation.volatility)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Renda Fixa
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">Valor Final</span>
                <span className="text-lg font-semibold text-slate-800">
                  {formatCurrency(simulation.results.fixedIncome.finalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">Total Investido</span>
                <span className="text-slate-800">
                  {formatCurrency(simulation.results.fixedIncome.totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">Lucro Bruto</span>
                <span className="text-green-600 font-medium">
                  {formatCurrency(simulation.results.fixedIncome.grossProfit)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">IR</span>
                <span className="text-red-600">
                  -{formatCurrency(simulation.results.fixedIncome.ir)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">IOF</span>
                <span className="text-red-600">
                  -{formatCurrency(simulation.results.fixedIncome.iof)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-800 font-medium">Lucro Líquido</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(simulation.results.fixedIncome.netProfit)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Renda Variável
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">Valor Final</span>
                <span className="text-lg font-semibold text-slate-800">
                  {formatCurrency(simulation.results.variableIncome.finalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-slate-600">Total Investido</span>
                <span className="text-slate-800">
                  {formatCurrency(simulation.results.variableIncome.totalInvested)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-800 font-medium">Lucro Bruto</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(simulation.results.variableIncome.grossProfit)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Comparação
          </h2>
          <div className="text-center">
            <p className="text-slate-600 mb-2">
              Diferença entre Renda Variável e Renda Fixa
            </p>
            <p
              className={`text-4xl font-bold ${
                simulation.results.comparison.differencePercent >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {simulation.results.comparison.differencePercent >= 0 ? "+" : ""}
              {formatPercent(simulation.results.comparison.differencePercent)}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {simulation.results.comparison.differencePercent >= 0
                ? "Renda Variável teve melhor desempenho"
                : "Renda Fixa teve melhor desempenho"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Evolução Mensal - Renda Fixa
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">
                      Mês
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {simulation.results.fixedIncome.monthlyEvolution.map((item) => (
                    <tr
                      key={item.month}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-2 text-slate-700">{item.month}</td>
                      <td className="py-3 px-2 text-right text-slate-800 font-medium">
                        {formatCurrency(item.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Evolução Mensal - Renda Variável
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">
                      Mês
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {simulation.results.variableIncome.monthlyEvolution.map((item) => (
                    <tr
                      key={item.month}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-2 text-slate-700">{item.month}</td>
                      <td className="py-3 px-2 text-right text-slate-800 font-medium">
                        {formatCurrency(item.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
