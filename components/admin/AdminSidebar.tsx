"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, CreditCard, BarChart3 } from "lucide-react"

const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Vendors", href: "/admin/vendors", icon: Users },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-gray-900 text-gray-200 flex flex-col p-6">
            <h2 className="text-2xl font-bold text-indigo-400 mb-10">
                Ivory Table
            </h2>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const active = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-gray-800"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
