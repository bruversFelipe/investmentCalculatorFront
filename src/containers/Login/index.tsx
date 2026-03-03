"use client";

import { useState } from "react";
import Login from "./Login";
import Create from "./Create";


export default function LoginContainer() {
    const [login, setLogin] = useState("login");

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md px-6">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Calculadora de Investimentos
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        {login === "login" ? "Acesse sua conta para visualizar simulações" : "Crie sua conta para começar"}
                    </p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

                    {login === "login" ?
                        <>
                            <Login />
                            <div className="text-xs text-slate-400 text-center mt-6">
                                Não possui conta? <button className="font-semibold text-slate-800 hover:text-slate-600" onClick={() => setLogin("create")}>Criar</button>
                            </div>
                        </>
                        :
                        <>
                            <Create />
                            <div className="text-xs text-slate-400 text-center mt-6">
                                Já possui conta? <button className="font-semibold text-slate-800 hover:text-slate-600" onClick={() => setLogin("login")}>Fazer Login</button>
                            </div>
                        </>
                    }


                </div>
                <p className="text-xs text-slate-400 text-center mt-6">
                    © 2026 Calculadora de Investimentos
                </p>
            </div>
        </div>
    );
}
