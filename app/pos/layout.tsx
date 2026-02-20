export default function POSLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen w-screen bg-slate-100">
            {children}
        </div>
    )
}
