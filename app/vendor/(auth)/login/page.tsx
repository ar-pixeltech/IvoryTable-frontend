'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vendorLogin } from "@/services/vendor.service";
import { useAuth } from "@/context/AuthContext";
import RouteGuard from "@/components/RouteGuard";
import { Roles, RoleTypes } from "@/constants/roles";
import Input from "@/components/ui/Input";

export default function VendorLogin() {

  const router = useRouter();
  const { login } = useAuth();

  const testCredentials = {
    email: 'ramesh2@gmail.com',
    password: '123456',
  };

  const [email, setEmail] = useState(testCredentials.email);
  const [password, setPassword] = useState(testCredentials.password);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      const res = await vendorLogin({
        email,
        password
      });

      const { token, ...vendor } = res.data.data;

      login(token, 'vendor', vendor); // Store token and role in context/localStorage

    } catch (err: any) {

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed"
      );

    }

    setLoading(false);
  };

  return (
    <RouteGuard role={Roles.VENDOR} type={RoleTypes.GUEST}>
      <div className="min-h-screen flex">

        {/* Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 text-white items-center justify-center">
          <div className="text-center px-12">
            <h1 className="text-4xl font-bold mb-4">
              Vendor Portal
            </h1>
            <p className="text-lg opacity-90">
              Manage orders, menu, and inventory.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">

          <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px]">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Vendor Login
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">

              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="text-sm text-center mt-4">
              New vendor?{" "}
              <span
                onClick={() => router.push("/vendor/register")}
                className="text-emerald-600 cursor-pointer"
              >
                Register
              </span>
            </p>

          </div>
        </div>
      </div>
    </RouteGuard>
  );
}