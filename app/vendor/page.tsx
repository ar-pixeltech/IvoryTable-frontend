"use client"

import { useEffect, useState } from "react"
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts"
import { TrendingUp, ShoppingCart, Package, IndianRupee } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function VendorDashboard() {
    const [data, setData] = useState<any>({
        totalRevenue: 120000,
        totalOrders: 340,
        totalProducts: 58,
        avgOrderValue: 352.94,
        revenueChart: [
            { date: '2026-02-01', revenue: 12000 },
            { date: '2026-02-02', revenue: 15000 },
            { date: '2026-02-03', revenue: 18000 },
            { date: '2026-02-04', revenue: 11000 },
            { date: '2026-02-05', revenue: 17000 },
            { date: '2026-02-06', revenue: 16000 },
            { date: '2026-02-07', revenue: 21000 },
        ],
        ordersChart: [
            { date: '2026-02-01', orders: 40 },
            { date: '2026-02-02', orders: 55 },
            { date: '2026-02-03', orders: 60 },
            { date: '2026-02-04', orders: 38 },
            { date: '2026-02-05', orders: 50 },
            { date: '2026-02-06', orders: 47 },
            { date: '2026-02-07', orders: 50 },
        ],
        topProducts: [
            { id: '1', name: 'Classic Burger', quantity: 120 },
            { id: '2', name: 'Margherita Pizza', quantity: 98 },
            { id: '3', name: 'French Fries', quantity: 85 },
        ],
        recentOrders: [
            { id: 'ORD123456', createdAt: '2026-02-07T10:30:00Z', total: 1200 },
            { id: 'ORD123457', createdAt: '2026-02-07T09:15:00Z', total: 850 },
            { id: 'ORD123458', createdAt: '2026-02-06T18:45:00Z', total: 950 },
        ],
    })

    // useEffect(() => {
    //     axios.get("/vendor/dashboard").then((res) => {
    //         setData(res.data)
    //     })
    // }, [])

    // if (!data) return <div>Loading...</div>

    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Overview of your store performance
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6">
                <StatCard
                    icon={<IndianRupee />}
                    title="Total Revenue"
                    value={`${formatCurrency(data.totalRevenue) || '-'}`}
                />
                <StatCard
                    icon={<ShoppingCart />}
                    title="Total Orders"
                    value={data.totalOrders || '-'}
                />
                <StatCard
                    icon={<Package />}
                    title="Products"
                    value={data.totalProducts || '-'}
                />
                <StatCard
                    icon={<TrendingUp />}
                    title="Avg Order Value"
                    value={`${formatCurrency(data.avgOrderValue) || '-'}`}
                />
            </div>

            {/* Charts Section */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="font-semibold mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data.revenueChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="font-semibold mb-4">Orders Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data.ordersChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="orders"
                                fill="#10b981"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* Top Products */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="font-semibold mb-4">Top Selling Products</h2>
                    <ul className="space-y-3">
                        {data.topProducts.map((p: any) => (
                            <li
                                key={p.id}
                                className="flex justify-between border-b pb-2 text-sm"
                            >
                                <span>{p.name}</span>
                                <span className="font-medium">
                                    {p.quantity} sold
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="font-semibold mb-4">Recent Orders</h2>
                    <div className="space-y-3">
                        {data.recentOrders.map((order: any) => (
                            <div
                                key={order.id}
                                className="flex justify-between items-center border-b pb-2 text-sm"
                            >
                                <div>
                                    <p className="font-medium">
                                        #{order.id.slice(0, 6)}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="font-semibold text-emerald-600">
                                    ₹{order.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

/* ---------------- Components ---------------- */

function StatCard({ icon, title, value }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h3 className="text-xl font-bold">{value}</h3>
            </div>
        </div>
    )
}
