"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RouteGuardProps {
    children: React.ReactNode;
    role: string;
    type: "protected" | "guest";
    redirectTo?: string;
}

export default function RouteGuard({
    children,
    role,
    type,
    redirectTo,
}: RouteGuardProps) {
    const { token, role: userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        // Protected pages (dashboard)
        if (type === "protected") {
            if (!token || userRole !== role) {
                router.push(redirectTo || `/${role}/login`);
            }
        }

        // Guest pages (login)
        if (type === "guest") {
            if (token && userRole === role) {
                router.push(redirectTo || `/${role}/dashboard`);
            }
        }
    }, [token, userRole, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}
