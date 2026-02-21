"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    User,
    CreditCard,
    List
} from "lucide-react"

const menuItems = [
    { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
    { label: "Categories", href: "/vendor/categories", icon: List },
    { label: "Products", href: "/vendor/products", icon: Package },
    { label: "Sales", href: "/vendor/sales", icon: BarChart3 },
    { label: "POS", href: "/vendor/pos", icon: ShoppingCart },
    { label: "Subscription", href: "/vendor/subscription", icon: CreditCard },
    { label: "Profile", href: "/vendor/profile", icon: User },
]

export default function VendorSidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-emerald-900 text-emerald-100 flex flex-col p-6">
            <h2 className="text-2xl font-bold text-emerald-400 mb-10">
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
                                ? "bg-emerald-600 text-white"
                                : "hover:bg-emerald-800"
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
