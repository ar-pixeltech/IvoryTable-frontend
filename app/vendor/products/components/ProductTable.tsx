import axios from "@/lib/axios"
import Image from "next/image"
import StockBadge from "../../../../components/ui/StockBadge"
import StatusBadge from "../../../../components/ui/StatusBadge"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default function ProductTable(props: any) {
    const { products, refresh, productImageMap, toggleStatus } = props

    const deleteProduct = async (id: string) => {
        await axios.delete(`/vendor/products/${id}`)
        refresh()
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: { id: Key | null | undefined; imageKey: string | number; name: string; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; stock: any; isActive: any }) => (
                        <tr key={product.id} className="border-t">
                            <td className="p-4 flex items-center gap-3">
                                {product.imageKey && (
                                    <div className="relative w-10 h-10 rounded-md overflow-hidden">
                                        <Image
                                            src={productImageMap[product.imageKey]}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                {product.name}
                            </td>

                            <td className="p-4">₹{product.price}</td>

                            <td className="p-4">
                                <StockBadge stock={product.stock} />
                            </td>

                            <td className="p-4">
                                <StatusBadge product={product} />
                            </td>

                            <td className="p-4">
                                <button
                                    onClick={() =>
                                        toggleStatus(product.id, product.isActive)
                                    }
                                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                                >
                                    Toggle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
