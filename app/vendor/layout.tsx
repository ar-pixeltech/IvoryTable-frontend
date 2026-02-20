export default function VendorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {children}
        </div>
    )
}
