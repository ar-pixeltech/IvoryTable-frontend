"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import RouteGuard from "@/components/RouteGuard";
import { Roles, RoleTypes } from "@/constants/roles";
import VendorSidebar from "@/components/vendor/VendorSidebar";
import VendorNavbar from "@/components/vendor/VendorNavbar";


export default function VendorLayout({ children }: { children: ReactNode }) {
    const { logout } = useAuth();

    return (
        <RouteGuard role={Roles.VENDOR} type={RoleTypes.GUEST}>
            <div className="flex min-h-screen bg-gray-100">

                <VendorSidebar />

                <div className="flex-1 flex flex-col bg-slate-100">
                    <VendorNavbar />
                    <main className="p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>

            </div>
        </RouteGuard>


    );
}
