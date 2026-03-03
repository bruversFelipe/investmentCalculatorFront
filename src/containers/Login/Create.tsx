"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { setTokenAtom } from "@/store/authAtom";
import { createAccount } from "@/services/auth";
import axios from "axios";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CreateState } from "./types";

const initialState: CreateState = {
    email: '',
    name: '',
    password: "",
    error: null,
}

export default function Create() {
    const [state, setState] = useState<CreateState>(initialState);
    const navigate = useNavigate();
    const setToken = useSetAtom(setTokenAtom);

    const onChange = (item: keyof CreateState, value: string) => {
        setState(prevState => ({ ...prevState, [item]: value, error: null }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { email, name, password } = state;
            const response = await createAccount({ email, name, password });

            if (response.success && response.data?.token) {
                setToken(response.data.token);
                navigate("/home");
            } else {
                setState(prevState => ({ ...prevState, error: response.message || "Erro ao criar conta" }));
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
                label="Nome"
                type="text"
                value={state.name}
                onChange={(e) => onChange('name', e.target.value)}
                required
                placeholder="Seu nome"
            />

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
                Criar Conta
            </Button>
        </form>
    );
}
