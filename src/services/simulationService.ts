import api from "@/utils/api";

export interface SimulationPayload {
    name: string;
    initialAmount: number;
    monthlyContribution: number;
    periodMonths: number;
    fixedAnnualRate: number;
    variableAnnualReturn: number;
    volatility: number;
}

export async function createSimulation(data: SimulationPayload) {
    try {
        const response = await api.post("/simulation/create", data);
        return response.data;
    } catch (error) {
        console.error("Create simulation failed:", error);
        throw error;
    }
}

export async function listSimulations() {
    try {
        const response = await api.get("/simulation/list");
        return response.data;
    } catch (error) {
        console.error("List simulations failed:", error);
        throw error;
    }
}

export async function getSimulation(id: string) {
    try {
        const response = await api.get(`/simulation/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get simulation failed:", error);
        throw error;
    }
}

export async function deleteSimulation(id: string) {
    try {
        const response = await api.delete(`/simulation/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete simulation failed:", error);
        throw error;
    }
}
