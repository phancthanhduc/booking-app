"use client";
import { SessionProvider } from "next-auth/react";
import { NextAuthProviderProps } from "@/commons/typescripts";

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
