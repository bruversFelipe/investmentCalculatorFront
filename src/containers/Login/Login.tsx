"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/auth";
import axios from "axios";
import { useSetAtom } from "jotai";
import { setTokenAtom } from "@/store/authAtom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { LoginState } from "./types";

const initialState: LoginState = {
    email: '',
    password: "",
    error: null,
}

export default function Login() {
    const [state, setState] = useState<LoginState>(initialState);
    const navigate = useNavigate();
    const setToken = useSetAtom(setTokenAtom);

    const onChange = (item: keyof LoginState, value: string) => {
        setState(prevState => ({ ...prevState, [item]: value, error: null }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { email, password } = state;
            const response = await auth({ email, password });
            
            if (response.success && response.data?.token) {
                setToken(response.data.token);
                navigate("/home");
            } else {
                setState(prevState => ({ ...prevState, error: response.message || "Erro ao fazer login" }));
            }
        } catch (err: unknown) {
            let message = "Erro desconhecido";
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message || err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }
            setState(prevState => ({ ...prevState, error: `Erro: ${message}` }))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                value={state.email}
                onChange={(e) => onChange('email', e.target.value)}
                required
                placeholder="seu@email.com"
            />

            <Input
                label="Senha"
                type="password"
                value={state.password}
                onChange={(e) => onChange('password', e.target.value)}
                required
                placeholder="••••••••"
            />

            {state.error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                    {state.error}
                </p>
            )}

            <Button type="submit" fullWidth>
                Entrar
            </Button>
        </form>
    );
}
