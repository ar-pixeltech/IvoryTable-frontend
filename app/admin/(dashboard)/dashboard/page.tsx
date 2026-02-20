'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card"

export default function AdminDashboard() {

    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const role = localStorage.getItem("role");

    //     if (!token || role !== "admin") {
    //         router.push("/admin/login");
    //     }
    // }, []);

    return (
        <div className="space-y-8">

            <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Overview
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <StatCard title="Total Vendors" value="124" />
                <StatCard title="Active Vendors" value="98" />
                <StatCard title="Monthly Revenue" value="₹2,45,000" />
                <StatCard title="Trial Users" value="21" />

            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">
                    Recent Vendors
                </h2>

                <table className="w-full text-left">
                    <thead className="text-gray-500 text-sm">
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Plan</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-t">
                            <td className="py-3">Spicy Hub</td>
                            <td>9876543210</td>
                            <td className="text-green-600">Active</td>
                            <td>Pro</td>
                        </tr>
                    </tbody>
                </table>
            </Card>

        </div>
    )
}

function StatCard({ title, value }: { title: string; value: string }) {
    return (
        <Card>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-2 text-indigo-600">
                {value}
            </h3>
        </Card>
    )
}
