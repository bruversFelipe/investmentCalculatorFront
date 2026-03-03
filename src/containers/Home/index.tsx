"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { tokenAtom, setTokenAtom } from "@/store/authAtom";
import { listSimulations } from "@/services/simulationService";
import Button from "@/components/ui/Button";
import { removeStorage } from "@/utils/storage";
import { SimulationListItem } from "./types";
import Create from "./Create";
import List from "./List";

export default function HomeContainer() {
  const [simulations, setSimulations] = useState<SimulationListItem[]>([]);
  const navigate = useNavigate();
  const [token] = useAtom(tokenAtom);
  const setToken = useSetAtom(setTokenAtom);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const fetchSimulations = async () => {
    try {
      const response = await listSimulations();
      if (response.success && response.data) {
        setSimulations(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch simulations:", err);
    }
  };

  useEffect(() => {
    fetchSimulations();
  }, []);

  const logout = () => {
    removeStorage("auth_token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">
              Calculadora de Investimentos
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Crie e compare simulações de investimentos
            </p>
          </div>
          <Button onClick={logout}>
            Sair
          </Button>
        </div>

        <Create onSuccess={fetchSimulations} />
        <List simulations={simulations} onDelete={fetchSimulations} />
      </div>
    </div>
  );
}
