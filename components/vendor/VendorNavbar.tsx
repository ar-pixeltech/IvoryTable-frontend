"use client"
import { useAuth } from "@/context/AuthContext"

export default function VendorNavbar() {
    const {
        // user, 
        logout } = useAuth()

    return (
        <div className="h-16 bg-white border-b px-8 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
                Vendor Panel
            </h1>

            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                    Vendor
                    {/* {user?.name || "Vendor"} */}
                </div>

                <button
                    onClick={logout}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
