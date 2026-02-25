export default function StockBadge({ stock }: any) {
    if (stock <= 0)
        return (
            <span className="text-xs text-red-500 font-medium">
                Out of Stock
            </span>
        )

    if (stock < 5)
        return (
            <span className="text-xs text-yellow-500 font-medium">
                Low Stock ({stock})
            </span>
        )

    return <span>{stock}</span>
}