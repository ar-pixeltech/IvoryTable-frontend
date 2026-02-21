"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import {
    getSubscriptionPlans,
    createSubscriptionPlan,
} from "@/services/subscription.service";
import { formatCurrency } from "@/lib/utils";

type Plan = {
    id: string;
    name: string;
    price: number;
    durationDays: number;
    description?: string;
    isTrial: boolean;
};

type PlanForm = {
    name: string;
    price: number;
    durationDays: number;
    isTrial: boolean;
};

export default function SubscriptionsPage() {


    const [plans, setPlans] = useState<Plan[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState<PlanForm>({
        name: "",
        price: 0,
        durationDays: 30,
        isTrial: false,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<any>({});
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState(0);
    // const [durationDays, setDurationDays] = useState(30);

    const validate = () => {
        const newErrors: any = {};

        if (!form.name.trim()) {
            newErrors.name = "Plan name is required";
        }

        if (!form.isTrial && form.price <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (form.durationDays <= 0) {
            newErrors.durationDays = "Duration must be at least 1 day";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch Plans
    const fetchPlans = async () => {
        const res = await getSubscriptionPlans();
        setPlans(prev => [...prev, ...res.data.data]);
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    // 🔥 Create Plan
    const handleCreate = async () => {
        if (loading) return; // Prevent double click
        if (!validate()) return;

        try {

            setLoading(true);

            await createSubscriptionPlan({
                name: form.name,
                price: form.price,
                durationDays: form.durationDays,
            });
            setSuccess(true);

            // reset form
            setForm({
                name: "",
                price: 0,
                durationDays: 30,
                isTrial: false,
            });

            setTimeout(() => setSuccess(false), 3000);
            setIsModalOpen(false);
            await fetchPlans(); // refresh list

        } catch (err) {
            console.log("Error creating plan:", err);
            return;
        } finally {
            setLoading(false);
        }


    };

    const getExpiryDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + form.durationDays);
        return today.toDateString();

        //   <p className="text-xs text-gray-500 mt-1">
        //   Expires on: {getExpiryDate()}
        // </p>
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Subscription Plans
                </h1>

                <Button onClick={() => setIsModalOpen(true)}>
                    Create Plan
                </Button>
            </div>

            {/* List */}
            <div className="grid grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id}>
                        <h3 className="text-xl font-bold mb-2">
                            {plan.name}
                        </h3>
                        <p className="text-gray-500 mb-4" key={`price_${plan.id}`}>
                            {formatCurrency(plan.price)} / {plan.durationDays} days
                            {/* ₹{plan.price} / {plan.durationDays} days */}
                        </p>
                        <p key={`description_${plan.id}`}>{plan.description || "No description"}</p>
                    </Card>
                ))}
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


            {/* 🔥 Create Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <h2 className="text-xl font-bold mb-4">
                    Create Subscription Plan
                </h2>

                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.name}
                    </p>
                )}

                <div className="space-y-5">

                    {/* Plan Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Plan Name
                        </label>
                        <input
                            className="w-full border border-gray-200 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-xl transition"
                            value={form.name}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, name: e.target.value }))
                            }
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Name of the subscription plan visible to vendors.
                        </p>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Price (₹)
                        </label>
                        <input
                            type="number"

                            disabled={form.isTrial}
                            value={form.isTrial ? 0 : form.price}
                            onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                            className={`w-full border border-gray-200 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-xl transition ${form.isTrial ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Subscription cost for this plan.
                        </p>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Duration (Days)
                        </label>
                        <input
                            type="number"
                            className="w-full border border-gray-200 focus:border-black focus:ring-1 focus:ring-black p-3 rounded-xl transition"
                            value={form.durationDays}
                            onChange={(e) => setForm((prev) => ({ ...prev, durationDays: Number(e.target.value) }))}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Validity period in days.
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-xl">
                        <div>
                            <p className="text-sm font-medium">Trial Plan</p>
                            <p className="text-xs text-gray-500">
                                Enable if this plan is a free trial.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    isTrial: !prev.isTrial,
                                    price: !prev.isTrial ? 0 : prev.price,
                                }))
                            }

                            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${form.isTrial ? "bg-black" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${form.isTrial ? "translate-x-6" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleCreate} disabled={loading}>
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>

                </div>

            </Modal>

        </div>
    );
}
