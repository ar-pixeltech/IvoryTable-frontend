"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import ProductModal from "./components/ProductModal"
import ProductTable from "./components/ProductTable"
import Image from "next/image"
import { LayoutGrid, List } from "lucide-react"
import ProductGrid from "./components/ProductGrid"


export default function ProductsPage() {

    const productImageMap: Record<string, string> = {
        burger: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1450",
        pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1450",
        fries: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1450",
        coffee: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1450"
    };

    const mockProducts = [
        { id: "1", name: "Classic Burger", price: 129, imageKey: "burger", isActive: true, stock: 10 },
        { id: "2", name: "Margherita Pizza", price: 199, imageKey: "pizza", isActive: true, stock: 3 },
        { id: "3", name: "French Fries", price: 79, imageKey: "fries", isActive: false, stock: 0 },
        { id: "4", name: "Iced Coffee", price: 99, imageKey: "coffee", isActive: true, stock: 7 }
    ];

    const [products, setProducts] = useState(mockProducts)
    const [open, setOpen] = useState(false)
    const [view, setView] = useState<"grid" | "list">("grid")

    const fetchProducts = async () => {
        const res = await axios.get("/vendor/products")
        setProducts(res.data)
    }

    useEffect(() => {
        // fetchProducts()

        const savedView = localStorage.getItem("productView")
        if (savedView) setView(savedView as any)
    }, [])

    const changeView = (mode: "grid" | "list") => {
        setView(mode)
        localStorage.setItem("productView", mode)
    }

    const toggleStatus = async (id: string, isActive: boolean) => {
        await axios.patch(`/vendor/products/${id}`, {
            isActive: !isActive
        })
        fetchProducts()
    }

    return (
        <div>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>

                <div className="flex items-center gap-4">

                    {/* View Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => changeView("grid")}
                            className={`p-2 rounded-md ${view === "grid" ? "bg-white shadow-sm" : ""
                                }`}
                        >
                            <LayoutGrid size={18} />
                        </button>

                        <button
                            onClick={() => changeView("list")}
                            className={`p-2 rounded-md ${view === "list" ? "bg-white shadow-sm" : ""
                                }`}
                        >
                            <List size={18} />
                        </button>
                    </div>

                    <a
                        onClick={() => setOpen(true)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Add Product
                    </a>
                </div>
            </div>


            {/* GRID VIEW */}
            {view === "grid" && (
                <ProductGrid products={products} refresh={fetchProducts}
                    productImageMap={productImageMap}
                    toggleStatus={toggleStatus}
                />
            )}

            {/* LIST VIEW */}
            {view === "list" && (
                <ProductTable products={products} refresh={fetchProducts}
                    productImageMap={productImageMap}
                    toggleStatus={toggleStatus}
                />
            )}



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
