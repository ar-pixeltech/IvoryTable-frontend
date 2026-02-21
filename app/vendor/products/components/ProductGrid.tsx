import axios from "@/lib/axios"
import Image from "next/image"
import StockBadge from "../../../../components/ui/StockBadge"
import StatusBadge from "../../../../components/ui/StatusBadge"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default function ProductGrid(props: any) {
    const { products, refresh, productImageMap, toggleStatus } = props

    // const deleteProduct = async (id: string) => {
    //     await axios.delete(`/vendor/products/${id}`)
    //     refresh()
    // }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {products.map((product: { id: Key | null | undefined; imageKey: string | number; name: string; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; stock: any; isActive: any }) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-sm border p-4 space-y-3"
                >
                    {product.imageKey && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden">
                            <Image
                                src={product.imageKey ? productImageMap[product.imageKey] : "/placeholder.png"}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{product.name}</h3>

                        <StatusBadge product={product} />
                    </div>

                    <p className="text-sm text-gray-500">₹{product.price}</p>

                    <StockBadge stock={product.stock} />

                    <button
                        onClick={() => toggleStatus(product.id, product.isActive)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg"
                    >
                        Toggle Active
                    </button>
                </div>
            ))}
        </div>
    )
}
