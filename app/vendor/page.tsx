"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"

export default function VendorDashboard() {
    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        axios.get("/vendor/dashboard").then((res) => {
            setStats(res.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <StatCard title="Total Sales" value={`₹${stats?.totalSales || 0}`} />
                <StatCard title="Total Orders" value={stats?.totalOrders || 0} />
                <StatCard title="Total Products" value={stats?.totalProducts || 0} />
                <StatCard title="Active Staff" value={stats?.totalStaff || 0} />
            </div>
        </div>
    )
}

function StatCard({ title, value }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold mt-2">{value}</h2>
        </div>
    )
}
