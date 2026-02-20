"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { token, role, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!token || role !== "admin") {
                router.push("/admin/login");
            }
        }
    }, [token, role, loading]);

    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col bg-slate-100">
                <AdminNavbar />
                <main className="p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
