"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/services/admin.service";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await adminLogin({ email, password });

            login(res.data.data.token, "admin");    // Store token and role in context/localStorage

            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Branding Panel */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center">
                <div className="text-center px-12">
                    <h1 className="text-4xl font-bold mb-4">POS Admin Panel</h1>
                    <p className="text-lg opacity-90">
                        Manage vendors, subscriptions, and platform analytics.
                    </p>
                </div>
            </div>

            {/* Right Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px]">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Admin Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
