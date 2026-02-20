import axios from "@/lib/axios"

export default function ProductTable({ products, refresh }: any) {

    const deleteProduct = async (id: string) => {
        await axios.delete(`/vendor/products/${id}`)
        refresh()
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 text-left text-sm text-gray-600">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p: any) => (
                        <tr key={p.id} className="border-t">
                            <td className="p-4">{p.name}</td>
                            <td className="p-4">₹{p.price}</td>
                            <td className="p-4">{p.stock}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => deleteProduct(p.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
