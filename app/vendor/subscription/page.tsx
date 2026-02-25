"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState<any>(null)

    useEffect(() => {
        api.get("/vendor/subscription").then((res) => {
            setSubscription(res.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8">Subscription</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border w-96">
                <p><strong>Plan:</strong> {subscription?.planName}</p>
                <p><strong>Price:</strong> ₹{subscription?.price}</p>
                <p><strong>Valid Till:</strong> {subscription?.expiryDate}</p>
            </div>
        </div>
    )
}
