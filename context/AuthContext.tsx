"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    role: string | null;
    loading: boolean;
    user?: any; // Optional, can be used to store user details
    login: (token: string, role: string, user?: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedUser = localStorage.getItem("user");

        if (storedToken) setToken(storedToken);
        if (storedRole) setRole(storedRole);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false); // IMPORTANT
    }, []);

    const login = (token: string, role: string, user: any) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setRole(role);
        setUser(user);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setUser(null);
        window.location.href = "/admin/login";
    };

    return (
        <AuthContext.Provider value={{ token, role, loading, user, login, logout }}>
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
