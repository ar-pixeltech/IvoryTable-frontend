"use client"

import { useState } from "react"
import axios from "@/lib/axios"

export default function ProductModal({ onClose }: any) {
    const [form, setForm] = useState({
        name: "",
        price: 0,
        stock: 0,
    })

    const handleSubmit = async () => {
        await axios.post("/vendor/products", form)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-96 p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-6">Add Product</h2>

                <input
                    className="w-full border p-3 rounded-lg mb-4"
                    placeholder="Product Name"
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    type="number"
                    className="w-full border p-3 rounded-lg mb-4"
                    placeholder="Price"
                    onChange={(e) =>
                        setForm({ ...form, price: Number(e.target.value) })
                    }
                />

                <input
                    type="number"
                    className="w-full border p-3 rounded-lg mb-6"
                    placeholder="Stock"
                    onChange={(e) =>
                        setForm({ ...form, stock: Number(e.target.value) })
                    }
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 border rounded-lg py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
