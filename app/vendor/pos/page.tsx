"use client"

// export default function POSPage() {
//     return (
//         // <div>
//         //     <h1 className="text-2xl font-bold mb-8">POS</h1>

//         //     <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
//         //         <p className="text-gray-500">
//         //             POS Screen (Cart + Product Grid coming next phase)
//         //         </p>
//         //     </div>
//         // </div>
//     )
// }


"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, Trash2 } from "lucide-react"

const categories = ["Burgers", "Pizzas", "Drinks", "Desserts"]

const products = [
    { id: "1", name: "Cheese Burger", price: 120, category: "Burgers", image: "/burger.jpg" },
    { id: "2", name: "Veg Burger", price: 100, category: "Burgers", image: "/burger.jpg" },
    { id: "3", name: "Margherita", price: 250, category: "Pizzas", image: "/pizza.jpg" },
    { id: "4", name: "Coke", price: 40, category: "Drinks", image: "/drink.jpg" },
    { id: "5", name: "Brownie", price: 90, category: "Desserts", image: "/dessert.jpg" },
]

export default function POSPage() {
    const [activeCategory, setActiveCategory] = useState("Burgers")
    const [cart, setCart] = useState<any[]>([])

    const addToCart = (product: any) => {
        const existing = cart.find(item => item.id === product.id)

        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    const updateQuantity = (id: string, type: "inc" | "dec") => {
        setCart(cart.map(item => {
            if (item.id === id) {
                if (type === "inc") return { ...item, quantity: item.quantity + 1 }
                if (type === "dec" && item.quantity > 1)
                    return { ...item, quantity: item.quantity - 1 }
            }
            return item
        }))
    }

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const gst = subtotal * 0.18
    const total = subtotal + gst

    return (
        <div className="flex h-screen bg-gray-50">



            {/* LEFT SIDE — Products */}
            <div className="w-2/3 p-6 space-y-6 overflow-y-auto">

                {/* Categories */}
                <div className="flex gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm transition
                ${activeCategory === cat
                                    ? "bg-emerald-600 text-white"
                                    : "bg-white border hover:bg-gray-100"}
              `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>



                <div>
                    <h1 className="text-2xl font-bold mb-8">POS</h1>

                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                        <p className="text-gray-500">
                            POS Screen (Cart + Product Grid coming next phase)
                            This option would be in full screen mode without sidebar for ease of use on tablets.
                        </p>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {products
                        .filter(p => p.category === activeCategory)
                        .map(product => (
                            <div
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer overflow-hidden"
                            >
                                <div className="relative h-32 w-full">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-sm">
                                        {product.name}
                                    </h3>
                                    <p className="text-emerald-600 font-medium mt-1">
                                        ₹{product.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* RIGHT SIDE — Cart */}
            <div className="w-1/3 bg-white border-l p-6 flex flex-col">

                <h2 className="text-lg font-semibold mb-4">Current Order</h2>

                {/* Cart Items */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                    {cart.length === 0 && (
                        <p className="text-gray-400 text-sm">No items added</p>
                    )}

                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                    ₹{item.price} x {item.quantity}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, "dec")}
                                    className="p-1 bg-gray-100 rounded"
                                >
                                    <Minus size={14} />
                                </button>

                                <span className="text-sm">{item.quantity}</span>

                                <button
                                    onClick={() => updateQuantity(item.id, "inc")}
                                    className="p-1 bg-gray-100 rounded"
                                >
                                    <Plus size={14} />
                                </button>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-1 text-red-500"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>GST (18%)</span>
                        <span>₹{gst.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>

                    <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition font-medium">
                        Checkout
                    </button>
                </div>

            </div>
        </div>
    )
}
