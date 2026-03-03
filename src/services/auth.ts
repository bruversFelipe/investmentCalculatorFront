import api from "@/utils/api";

export interface AuthPayload {
    email: string;
    password: string;
}

export interface CreateAccountPayload {
    name: string;
    email: string;
    password: string;
}

export async function auth(payload: AuthPayload) {
    try {
        const response = await api.post("/auth", payload);
        return response.data;
    } catch (error) {
        console.error("Falha na autenticação:", error);
        throw error;
    }
}

export async function createAccount(payload: CreateAccountPayload) {
    try {
        const response = await api.post("/create", payload);
        return response.data;
    } catch (error) {
        console.error("Falha na criação:", error);
        throw error;
    }
}