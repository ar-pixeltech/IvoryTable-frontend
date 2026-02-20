// "use client"

// import { useState } from "react"
// import { useAuth } from "@/context/AuthContext"
// import axios from "@/lib/axios"
// import { Camera, Save } from "lucide-react"

// export default function VendorProfilePage() {
//     const { user } = useAuth()

//     const [form, setForm] = useState({
//         name: user?.name || "",
//         email: user?.email || "",
//         storeName: "",
//         phone: "",
//     })

//     const [loading, setLoading] = useState(false)

//     const handleUpdate = async () => {
//         try {
//             setLoading(true)
//             await axios.put("/vendor/profile", form)
//             alert("Profile updated successfully")
//         } catch (err) {
//             alert("Something went wrong")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="space-y-8">

//             {/* Header Section */}
//             <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white shadow-lg">
//                 <div className="flex items-center gap-6">
//                     <div className="relative">
//                         <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
//                             {user?.name?.charAt(0)}
//                         </div>

//                         <button className="absolute bottom-0 right-0 bg-white text-emerald-600 p-1 rounded-full shadow">
//                             <Camera size={16} />
//                         </button>
//                     </div>

//                     <div>
//                         <h1 className="text-2xl font-bold">{user?.name}</h1>
//                         <p className="text-sm opacity-90">{user?.email}</p>
//                         <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-xs">
//                             Vendor Account
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="grid grid-cols-3 gap-8">

//                 {/* Profile Form */}
//                 <div className="col-span-2 bg-white rounded-2xl shadow-sm border p-8 space-y-6">

//                     <h2 className="text-xl font-semibold">Personal Information</h2>

//                     <div className="grid grid-cols-2 gap-6">
//                         <div>
//                             <label className="text-sm text-gray-500">Full Name</label>
//                             <input
//                                 className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
//                                 value={form.name}
//                                 onChange={(e) =>
//                                     setForm({ ...form, name: e.target.value })
//                                 }
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-500">Email</label>
//                             <input
//                                 className="w-full mt-1 border rounded-lg p-3 bg-gray-100"
//                                 value={form.email}
//                                 disabled
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-500">Store Name</label>
//                             <input
//                                 className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
//                                 value={form.storeName}
//                                 onChange={(e) =>
//                                     setForm({ ...form, storeName: e.target.value })
//                                 }
//                             />
//                         </div>

//                         <div>
//                             <label className="text-sm text-gray-500">Phone</label>
//                             <input
//                                 className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
//                                 value={form.phone}
//                                 onChange={(e) =>
//                                     setForm({ ...form, phone: e.target.value })
//                                 }
//                             />
//                         </div>
//                     </div>

//                     <button
//                         onClick={handleUpdate}
//                         disabled={loading}
//                         className="mt-4 flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
//                     >
//                         <Save size={18} />
//                         {loading ? "Saving..." : "Save Changes"}
//                     </button>
//                 </div>

//                 {/* Side Card */}
//                 <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

//                     <h3 className="text-lg font-semibold">Account Details</h3>

//                     <div className="space-y-3 text-sm text-gray-600">
//                         <p><strong>Account ID:</strong> {user?.id}</p>
//                         <p><strong>Role:</strong> {user?.role}</p>
//                         <p><strong>Status:</strong> Active</p>
//                         <p><strong>Joined:</strong> 2025</p>
//                     </div>

//                     <div className="border-t pt-4">
//                         <h4 className="text-sm font-semibold mb-3">Change Password</h4>

//                         <input
//                             type="password"
//                             placeholder="New Password"
//                             className="w-full border rounded-lg p-3 mb-3 focus:ring-2 focus:ring-emerald-500 outline-none"
//                         />

//                         <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition">
//                             Update Password
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }


"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import axios from "@/lib/axios"
import { Camera, Save } from "lucide-react"

type TabType = "profile" | "store" | "invoice"

export default function VendorSettingsPage() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<TabType>("profile")
    const [loading, setLoading] = useState(false)

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        phone: "",
    })

    const [storeForm, setStoreForm] = useState({
        storeName: "",
        gstNumber: "",
        gstPercentage: 18,
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        invoicePrefix: "INV",
        invoiceFooter: "Thank you for shopping with us!",
    })

    const handleSave = async () => {
        try {
            setLoading(true)
            await axios.put("/vendor/settings", {
                profile: profileForm,
                store: storeForm,
            })
            alert("Settings saved successfully")
        } catch (err) {
            alert("Error saving settings")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            {/* <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-500 mt-1">
                    Manage your account & store configuration
                </p>
            </div> */}

            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                            {user?.name?.charAt(0)}
                        </div>

                        <button className="absolute bottom-0 right-0 bg-white text-emerald-600 p-1 rounded-full shadow">
                            <Camera size={16} />
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <p className="text-sm opacity-90">{user?.email}</p>
                        <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-xs">
                            Vendor Account
                        </span>
                        <p className="text-gray-200 mt-1  text-sm">
                            Manage your account & store configuration
                        </p>
                    </div>

                </div>
            </div>


            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                <TabButton label="Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
                <TabButton label="Store Settings" active={activeTab === "store"} onClick={() => setActiveTab("store")} />
                <TabButton label="Invoice & GST" active={activeTab === "invoice"} onClick={() => setActiveTab("invoice")} />
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm border p-8">

                {activeTab === "profile" && (
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            value={profileForm.name}
                            onChange={(v) => setProfileForm({ ...profileForm, name: v })}
                        />
                        <Input
                            label="Phone"
                            value={profileForm.phone}
                            onChange={(v) => setProfileForm({ ...profileForm, phone: v })}
                        />
                        <Input label="Email" value={user?.email || ""} disabled />
                    </div>
                )}

                {activeTab === "store" && (
                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Store Name"
                            value={storeForm.storeName}
                            onChange={(v) => setStoreForm({ ...storeForm, storeName: v })}
                        />
                        <Input
                            label="GST Number (Optional)"
                            value={storeForm.gstNumber}
                            onChange={(v) => setStoreForm({ ...storeForm, gstNumber: v })}
                        />

                        <Input
                            label="Address Line 1"
                            value={storeForm.addressLine1}
                            onChange={(v) => setStoreForm({ ...storeForm, addressLine1: v })}
                        />
                        <Input
                            label="Address Line 2"
                            value={storeForm.addressLine2}
                            onChange={(v) => setStoreForm({ ...storeForm, addressLine2: v })}
                        />
                        <Input
                            label="City"
                            value={storeForm.city}
                            onChange={(v) => setStoreForm({ ...storeForm, city: v })}
                        />
                        <Input
                            label="State"
                            value={storeForm.state}
                            onChange={(v) => setStoreForm({ ...storeForm, state: v })}
                        />
                        <Input
                            label="Pincode"
                            value={storeForm.pincode}
                            onChange={(v) => setStoreForm({ ...storeForm, pincode: v })}
                        />
                    </div>
                )}

                {activeTab === "invoice" && (
                    <div className="grid grid-cols-2 gap-6">

                        <Input
                            label="GST Percentage (%)"
                            type="number"
                            value={storeForm.gstPercentage}
                            onChange={(v) =>
                                setStoreForm({
                                    ...storeForm,
                                    gstPercentage: Number(v),
                                })
                            }
                        />

                        <Input
                            label="Invoice Prefix"
                            value={storeForm.invoicePrefix}
                            onChange={(v) =>
                                setStoreForm({
                                    ...storeForm,
                                    invoicePrefix: v,
                                })
                            }
                        />

                        <div className="col-span-2">
                            <label className="text-sm text-gray-500">
                                Invoice Footer Message
                            </label>
                            <textarea
                                value={storeForm.invoiceFooter}
                                onChange={(e) =>
                                    setStoreForm({
                                        ...storeForm,
                                        invoiceFooter: e.target.value,
                                    })
                                }
                                className="w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                                rows={4}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
                    >
                        <Save size={18} />
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    )
}

function TabButton({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm transition ${active
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
        >
            {label}
        </button>
    )
}

function Input({
    label,
    value,
    onChange,
    type = "text",
    disabled = false,
}: any) {
    return (
        <div>
            <label className="text-sm text-gray-500">{label}</label>
            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full mt-1 border rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none ${disabled ? "bg-gray-100" : ""
                    }`}
            />
        </div>
    )
}
