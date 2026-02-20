"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    role: string | null;
    loading: boolean;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");

        if (storedToken) setToken(storedToken);
        if (storedRole) setRole(storedRole);

        setLoading(false); // IMPORTANT
    }, []);

    const login = (token: string, role: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setToken(token);
        setRole(role);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        window.location.href = "/admin/login";
    };

    return (
        <AuthContext.Provider value={{ token, role, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};
