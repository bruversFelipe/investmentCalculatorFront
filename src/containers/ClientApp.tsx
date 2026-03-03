"use client";

import dynamic from "next/dynamic";

const AppRouter = dynamic(() => import("../routers/AppRouter"), {
  ssr: false,
});

export default function ClientApp() {
  return <AppRouter />;
}
