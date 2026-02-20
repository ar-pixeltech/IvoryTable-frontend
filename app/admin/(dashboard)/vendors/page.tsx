import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function VendorsPage() {
    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Vendors</h1>
                <Button>Add Vendor</Button>
            </div>

            <Card>
                <input
                    placeholder="Search vendors..."
                    className="border p-2 rounded-lg mb-4 w-64"
                />

                <table className="w-full text-sm">
                    <thead className="text-gray-500">
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Subscription</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-3">Food Plaza</td>
                            <td>9999999999</td>
                            <td>Basic</td>
                            <td className="text-green-600">Active</td>
                        </tr>
                    </tbody>
                </table>
            </Card>

        </div>
    )
}
