"use client";

import React from "react";
import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/authAtom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [token] = useAtom(tokenAtom);
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
