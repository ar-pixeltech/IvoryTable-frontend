"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import ProductModal from "./components/ProductModal"
import ProductTable from "./components/ProductTable"

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        const res = await axios.get("/vendor/products")
        setProducts(res.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Products</h1>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                    Add Product
                </button>
            </div>

            <ProductTable products={products} refresh={fetchProducts} />

            {open && (
                <ProductModal
                    onClose={() => {
                        setOpen(false)
                        fetchProducts()
                    }}
                />
            )}
        </div>
    )
}
