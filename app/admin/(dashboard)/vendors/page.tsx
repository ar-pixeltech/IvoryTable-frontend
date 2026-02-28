'use client'

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { createVendor, getVendorList } from '@/services';
import { Eye, Pencil, Trash2Icon, View } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

type Subscription = {
  durationDays: number;
  id: string;
  isTrial: boolean;
  name: string;
  price: number;
};

type Vendor = {
  id: string;
  businessType: string;
  name: string;
  email: string;
  phone: string;
  subscriptionEndsAt: string;
  trialEndsAt: string;
  subscriptionId?: string;
  subscription?: Subscription;
  isActive: boolean;
};

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [deleteVendor, setDeleteVendor] = useState<Vendor | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    businessType: "",
  });

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingVendor(null);
    setForm({ name: "", phone: "", email: "", businessType: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setForm({
      name: vendor.name,
      phone: vendor.phone,
      email: vendor.email,
      businessType: vendor.businessType || "",
    });
    setIsModalOpen(true);
  };

  // Fetch Vendors
  const fetchVendors = async () => {
    const res = await getVendorList();
    // setVendors((prev) => [...prev, ...res.data.data]);
    setVendors(res.data.data);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vendors</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all registered vendors
          </p>
        </div>
        <Button onClick={openAddModal}>
          + Add Vendor
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* <Card className="p-6 rounded-2xl shadow-sm border"> */}
        <Card>
          <p className="text-sm text-gray-500">Total Vendors</p>
          <h2 className="text-2xl font-bold mt-2">{vendors.length}</h2>
        </Card>

        {/* <Card className="p-6 rounded-2xl shadow-sm border"> */}
        <Card>
          <p className="text-sm text-gray-500">Active Vendors</p>
          <h2 className="text-2xl font-bold mt-2 text-green-600">
            {vendors.filter((v) => v.isActive).length}
          </h2>
        </Card>

        {/* <Card className="p-6 rounded-2xl shadow-sm border"> */}
        <Card>
          <p className="text-sm text-gray-500">Inactive Vendors</p>
          <h2 className="text-2xl font-bold mt-2 text-red-500">
            {vendors.filter((v) => !v.isActive).length}
          </h2>
        </Card>
      </div>

      {/* Vendors Table */}
      {/* <Card className="p-6 rounded-2xl shadow-sm border"> */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <input
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition rounded-xl px-4 py-2 w-64 outline-none"
          />

          <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option>All Subscriptions</option>
            <option>Basic</option>
            <option>Pro</option>
            <option>Premium</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="pb-3">Vendor</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Subscription</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 font-medium text-gray-800">
                    {vendor.name}
                  </td>
                  <td className="py-4 text-gray-600">{vendor.phone}</td>
                  <td className="py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 font-medium">
                      {vendor.subscription?.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${vendor.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                        }`}
                    >
                      {vendor.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-4 text-right space-x-2">
                    <button className="text-indigo-600 hover:underline text-sm">
                      {/* <Eye size={16} /> */}
                      View</button>
                    <button
                      onClick={() => openEditModal(vendor)}
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      Edit
                      {/* <Pencil size={16} /> */}
                    </button>

                    <button
                      onClick={() => setDeleteVendor(vendor)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                      {/* <Trash2Icon size={16} /> */}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredVendors.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-400"
                  >
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* // Add/Edit Modal */}
      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">
            <h2 className="text-xl font-bold">
              {editingVendor ? "Edit Vendor" : "Add Vendor"}
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Vendor Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl px-4 py-2"
              />

              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-xl px-4 py-2"
              />

              <select
                value={form.businessType}
                onChange={(e) =>
                  setForm({ ...form, businessType: e.target.value })
                }
                className="w-full border rounded-xl px-4 py-2"
              >
                <option value="">Select Business Type</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="CAFE">Cafe</option>
                <option value="GROCERY">Grocery</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
              >
                {editingVendor ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )} */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVendor ? "Edit Vendor" : "Add Vendor"}
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
            >
              {editingVendor ? "Update" : "Create"}
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <input
            placeholder="Vendor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-xl px-4 py-2"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded-xl px-4 py-2"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-xl px-4 py-2"
          />

          <select
            value={form.businessType}
            onChange={(e) =>
              setForm({ ...form, businessType: e.target.value })
            }
            className="w-full border rounded-xl px-4 py-2"
          >
            <option value="">Select Business Type</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="CAFE">Cafe</option>
            <option value="GROCERY">Grocery</option>
          </select>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteVendor}
        onClose={() => setDeleteVendor(null)}
        onConfirm={() => {
          // call delete API here
          setDeleteVendor(null);
        }}
        title="Delete Vendor?"
        description={`Are you sure you want to delete ${deleteVendor?.name}?`}
        confirmText="Delete"
        danger
      />
    </div>
  );
}