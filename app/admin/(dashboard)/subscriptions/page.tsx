import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function SubscriptionsPage() {
    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Subscription Plans</h1>
                <Button>Create Plan</Button>
            </div>

            <div className="grid grid-cols-3 gap-6">

                <Card>
                    <h3 className="text-xl font-bold mb-2">Basic</h3>
                    <p className="text-gray-500 mb-4">₹999 / month</p>
                    <p>Inventory + Orders</p>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold mb-2">Pro</h3>
                    <p className="text-gray-500 mb-4">₹1999 / month</p>
                    <p>All features</p>
                </Card>

            </div>

        </div>
    )
}
