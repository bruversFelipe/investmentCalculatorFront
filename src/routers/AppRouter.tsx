"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginContainer from "../containers/Login";
import HomeContainer from "../containers/Home";
import DetailContainer from "../containers/Detail";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeContainer />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <PrivateRoute>
              <DetailContainer />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
