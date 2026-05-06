"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  Loader2,
  X,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

const emptyForm = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  postalCode: "",
  phone: "",
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch("/api/user/addresses");
      const data = await res.json();
      if (data.success) setAddresses(data.addresses);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.addressLine1 || !form.city || !form.country || !form.postalCode || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `/api/user/addresses/${editingId}` : "/api/user/addresses";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Address updated!" : "Address added!");
        setShowForm(false);
        fetchAddresses();
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/user/addresses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Address deleted");
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await fetch(`/api/user/addresses/${id}/default`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        toast.success("Default address updated");
        fetchAddresses();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Addresses</h1>
          <p className="text-gray-500 mt-1">Manage your shipping addresses</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#E84118] hover:bg-[#d13a15] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">
              {editingId ? "Edit Address" : "New Address"}
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full Name *"
                value={form.fullName}
                onChange={(v) => setForm((p) => ({ ...p, fullName: v }))}
                placeholder="John Doe"
              />
              <Field
                label="Phone *"
                value={form.phone}
                onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                placeholder="+1 555 000 0000"
                type="tel"
              />
            </div>
            <Field
              label="Address Line 1 *"
              value={form.addressLine1}
              onChange={(v) => setForm((p) => ({ ...p, addressLine1: v }))}
              placeholder="123 Main Street"
            />
            <Field
              label="Address Line 2"
              value={form.addressLine2}
              onChange={(v) => setForm((p) => ({ ...p, addressLine2: v }))}
              placeholder="Apt, Suite, Floor (optional)"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field
                label="City *"
                value={form.city}
                onChange={(v) => setForm((p) => ({ ...p, city: v }))}
                placeholder="New York"
              />
              <Field
                label="Country *"
                value={form.country}
                onChange={(v) => setForm((p) => ({ ...p, country: v }))}
                placeholder="US"
              />
              <Field
                label="Postal Code *"
                value={form.postalCode}
                onChange={(v) => setForm((p) => ({ ...p, postalCode: v }))}
                placeholder="10001"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setForm((p) => ({ ...p, isDefault: e.target.checked }))}
                className="rounded border-gray-300 text-[#E84118] focus:ring-[#E84118]"
              />
              <span className="text-sm text-gray-600">Set as default address</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#E84118] hover:bg-[#d13a15] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                {editingId ? "Update" : "Save Address"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={32} className="animate-spin text-[#E84118]" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <MapPin size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-600">No saved addresses</p>
          <p className="text-sm text-gray-400 mt-1">
            Add an address to speed up checkout.
          </p>
          <button
            onClick={openAdd}
            className="mt-4 inline-flex items-center gap-2 bg-[#E84118] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d13a15] transition-colors"
          >
            <Plus size={16} />
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                address.isDefault
                  ? "border-[#E84118] shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{address.fullName}</p>
                    {address.isDefault && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E84118] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                        <Star size={10} fill="currentColor" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="text-sm text-gray-600">{address.addressLine2}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.country} {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{address.phone}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-xs text-gray-500 hover:text-[#E84118] font-medium transition-colors px-2 py-1 rounded hover:bg-red-50"
                      title="Set as default"
                    >
                      Set Default
                    </button>
                  )}
                  <button
                    onClick={() => openEdit(address)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deletingId === address.id}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === address.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E84118] transition-colors text-sm"
      />
    </div>
  );
}
