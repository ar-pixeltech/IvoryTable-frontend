"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function AdminNavbar() {
    const { token, role, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token || role !== "admin") {
            router.push("/admin/login");
        }
    }, [token, role]);

    return (
        <div className="h-16 bg-white border-b px-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
                Admin Panel
            </h1>

            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                    Super Admin
                </div>

                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
