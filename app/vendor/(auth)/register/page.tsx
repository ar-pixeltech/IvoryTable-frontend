'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
// import { vendorRegister } from "@/services/vendor.service";

export default function VendorRegister() {

    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        businessType: "RESTAURANT"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            //   await vendorRegister(form);

            router.push("/vendor/login");

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed"
            );

        }

        setLoading(false);
    };

    return (

        <div className="min-h-screen flex">

            {/* Branding */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 text-white items-center justify-center">
                <div className="text-center px-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Join IvoryTable POS
                    </h1>
                    <p className="text-lg opacity-90">
                        Start managing your restaurant smarter.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">

                <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Vendor Registration
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <Input
                            placeholder="Business Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />

                        <Input
                            placeholder="Phone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            required
                        />

                        <Input
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />

                        <Select
                            description="Select the category that best describes your business."
                            onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                        >
                            <option value="RESTAURANT">Restaurant</option>
                            <option value="CAFE">Cafe</option>
                            <option value="GROCERY">Grocery</option>
                        </Select>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>

                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <span
                            onClick={() => router.push("/vendor/login")}
                            className="text-emerald-600 cursor-pointer"
                        >
                            Login
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}