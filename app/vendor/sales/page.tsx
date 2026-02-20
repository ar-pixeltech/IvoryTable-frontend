"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"

export default function SalesPage() {
    const [sales, setSales] = useState([])

    useEffect(() => {
        axios.get("/vendor/sales").then((res) => {
            setSales(res.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Sales</h1>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left">Order ID</th>
                            <th className="p-4 text-left">Amount</th>
                            <th className="p-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((s: any) => (
                            <tr key={s.id} className="border-t">
                                <td className="p-4">{s.id}</td>
                                <td className="p-4">₹{s.total}</td>
                                <td className="p-4">
                                    {new Date(s.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
