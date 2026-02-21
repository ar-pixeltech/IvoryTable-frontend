export default function StatusBadge({ product }: any) {
    if (!product.isActive) {
        return (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                Inactive
            </span>
        )
    }

    return (
        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
            Active
        </span>
    )
}