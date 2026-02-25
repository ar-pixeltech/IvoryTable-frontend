"use client"

import { useState } from "react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar
} from "recharts"
import { Calendar, Printer, FileText } from "lucide-react"

const revenueData = [
    { day: "Mon", revenue: 12000 },
    { day: "Tue", revenue: 18000 },
    { day: "Wed", revenue: 15000 },
    { day: "Thu", revenue: 22000 },
    { day: "Fri", revenue: 27000 },
    { day: "Sat", revenue: 30000 },
    { day: "Sun", revenue: 24000 },
]

const categoryRevenue = [
    { category: "Burgers", revenue: 72000 },
    { category: "Pizzas", revenue: 95000 },
    { category: "Drinks", revenue: 40000 },
    { category: "Desserts", revenue: 30000 },
    { category: "Mocktails", revenue: 72000 },
    { category: "Starters", revenue: 95000 },
    { category: "Sandwiches", revenue: 4000 }
]

const topProducts = [
    { name: "Cheese Burger", qty: 120, revenue: 14400 },
    { name: "Margherita Pizza", qty: 85, revenue: 21250 },
    { name: "Coke", qty: 200, revenue: 8000 },
]

const recentInvoices = [
    { id: "INV001", customer: "Rahul", total: 560, date: "Today" },
    { id: "INV002", customer: "Anita", total: 890, date: "Today" },
    { id: "INV003", customer: "Karan", total: 420, date: "Yesterday" },
]

const orders = [
    {
        id: "INV001",
        customer: "Rahul",
        total: 560,
        items: [
            { name: "Burger", qty: 2, price: 120 },
            { name: "Coke", qty: 1, price: 40 }
        ],
        date: "Today"
    },
    {
        id: "INV002",
        customer: "Anita",
        total: 890,
        items: [
            { name: "Pizza", qty: 1, price: 250 },
            { name: "Brownie", qty: 2, price: 90 }
        ],
        date: "Today"
    }
]

export default function SalesDashboard() {
    const [range, setRange] = useState("7d")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    const todayRevenue = 48200
    const todayOrders = 96
    const monthlyRevenue = 684000

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Sales Analytics</h1>
                    <p className="text-gray-500 text-sm">
                        Revenue insights & order management
                    </p>
                </div>

                {/* Date Range Filter */}
                <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
                    {["today", "7d", "30d"].map(r => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-3 py-1 text-sm rounded-md transition
                ${range === r
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-100"}
              `}
                        >
                            {r === "today" ? "Today" : r === "7d" ? "7 Days" : "30 Days"}
                        </button>
                    ))}
                    <Calendar size={16} className="text-gray-400 ml-2" />
                </div>
            </div>

            {/* KPI */}
            <div className="grid md:grid-cols-3 gap-6">
                <StatCard title="Revenue" value="₹4,82,000" growth="+12%" />
                <StatCard title="Orders" value="960" growth="+8%" />
                <StatCard title="Avg Order Value" value="₹502" growth="+3%" />
            </div>
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <StatCard title="Today's Revenue" value={`₹${todayRevenue}`} />
                <StatCard title="Today's Orders" value={todayOrders} />
                <StatCard title="Monthly Revenue" value={`₹${monthlyRevenue}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Revenue Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
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

                {/* Category Revenue */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Category Wise Revenue</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Top Selling Products */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Top Selling Items</h2>

                    <div className="space-y-4">
                        {topProducts.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {item.qty} sold
                                    </p>
                                </div>

                                <span className="text-emerald-600 font-semibold">
                                    ₹{item.revenue}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="font-semibold mb-4">Recent Invoices</h2>

                    <div className="space-y-4">
                        {recentInvoices.map(invoice => (
                            <div
                                key={invoice.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium text-sm">
                                        {invoice.id}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {invoice.customer} • {invoice.date}
                                    </p>
                                </div>

                                <span className="font-semibold">
                                    ₹{invoice.total}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Orders List */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h2 className="font-semibold mb-4">Orders</h2>

                <div className="space-y-3">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            onClick={() => setSelectedOrder(order)}
                            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
                        >
                            <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-xs text-gray-500">
                                    {order.customer} • {order.date}
                                </p>
                            </div>
                            <span className="font-semibold">₹{order.total}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ORDER DRAWER */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/20 flex justify-end z-50">
                    <div className="w-96 bg-white h-full shadow-xl p-6 space-y-6 overflow-y-auto animate-slide-in">

                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg">
                                {selectedOrder.id}
                            </h2>
                            <button onClick={() => setSelectedOrder(null)}>
                                ✕
                            </button>
                        </div>

                        <div className="space-y-3">
                            {selectedOrder.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.qty}</span>
                                    <span>₹{item.qty * item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-3 font-semibold flex justify-between">
                            <span>Total</span>
                            <span>₹{selectedOrder.total}</span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => window.print()}
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 py-2 rounded-lg"
                            >
                                <Printer size={16} />
                                Print
                            </button>

                            <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 rounded-lg">
                                <FileText size={16} />
                                Generate Invoice
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

function StatCard({ title, value, growth }: any) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6">
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            <p className="text-emerald-600 text-sm mt-1">{growth} vs last period</p>
        </div>
    )
}
