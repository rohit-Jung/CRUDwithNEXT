"use client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./apiSlice";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApiProvider api={apiSlice}>{children}</ApiProvider>;
};
