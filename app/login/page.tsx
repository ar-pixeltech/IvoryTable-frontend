"use client"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    POS SaaS Login
                </h1>

                <input
                    type="text"
                    placeholder="Email / Phone"
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-6"
                />

                <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700">
                    Login
                </button>

            </div>

        </div>
    )
}
