"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from "@/hooks/useCart";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneCode: z.string(),
  phone: z.string().min(5, "Phone number is required"),
  company: z.string().optional(),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  shippingMethod: z.string(),
  saveAddress: z.boolean().optional(),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;

export default function ShippingForm({ 
  onNext,
  defaultValues
}: { 
  onNext: (data: ShippingFormData) => void,
  defaultValues?: Partial<ShippingFormData>
}) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      phoneCode: "+92",
      country: "PK",
      shippingMethod: "standard",
      ...defaultValues
    }
  });

  const selectedMethod = watch("shippingMethod");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Full Name *</label>
            <input 
              {...register("fullName")}
              type="text" 
              className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.fullName ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
              placeholder="John Doe" 
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email Address *</label>
            <input 
              {...register("email")}
              type="email" 
              className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.email ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
              placeholder="john@example.com" 
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Phone Number *</label>
            <div className="flex">
              <select {...register("phoneCode")} className="bg-neutral-100 border border-neutral-200 p-4 rounded-l-xl text-xs font-bold focus:outline-none">
                <option value="+92">+92</option>
                <option value="+971">+971</option>
                <option value="+44">+44</option>
                <option value="+1">+1</option>
              </select>
              <input 
                {...register("phone")}
                type="tel" 
                className={`flex-grow bg-neutral-50 border-y border-r p-4 rounded-r-xl focus:outline-none ${errors.phone ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
                placeholder="300 1234567" 
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Company (Optional)</label>
            <input 
              {...register("company")}
              type="text" 
              className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-dark" 
              placeholder="Meharstare Exports" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Address Line 1 *</label>
          <input 
            {...register("addressLine1")}
            type="text" 
            className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.addressLine1 ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
            placeholder="Street address, P.O. box, company name, c/o" 
          />
          {errors.addressLine1 && <p className="text-red-500 text-xs">{errors.addressLine1.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Address Line 2 (Optional)</label>
          <input 
            {...register("addressLine2")}
            type="text" 
            className="w-full bg-neutral-50 border border-neutral-200 p-4 rounded-xl focus:outline-none focus:border-dark" 
            placeholder="Apartment, suite, unit, building, floor, etc." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">City *</label>
            <input 
              {...register("city")}
              type="text" 
              className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.city ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
            />
            {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Country *</label>
            <select 
              {...register("country")}
              className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.country ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`}
            >
              <option value="PK">Pakistan</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="AE">United Arab Emirates</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Postal Code *</label>
            <input 
              {...register("postalCode")}
              type="text" 
              className={`w-full bg-neutral-50 border p-4 rounded-xl focus:outline-none ${errors.postalCode ? 'border-red-500' : 'border-neutral-200 focus:border-dark'}`} 
            />
            {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode.message}</p>}
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <h4 className="font-athletic font-bold uppercase tracking-widest text-sm border-b pb-2">Shipping Method</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${selectedMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-neutral-100 hover:border-dark'}`}>
              <div className="flex items-center space-x-4">
                <input type="radio" value="standard" {...register("shippingMethod")} className="hidden" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedMethod === 'standard' ? 'bg-primary text-white' : 'bg-neutral-200 text-transparent'}`}>
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">Standard Shipping</p>
                  <p className="text-xs text-neutral-500">7-14 Business Days</p>
                </div>
              </div>
              <span className="font-bold text-dark">FREE</span>
            </label>

            <label className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${selectedMethod === 'express' ? 'border-primary bg-primary/5' : 'border-neutral-100 hover:border-dark'}`}>
              <div className="flex items-center space-x-4">
                <input type="radio" value="express" {...register("shippingMethod")} className="hidden" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedMethod === 'express' ? 'bg-primary text-white' : 'bg-neutral-200 text-transparent'}`}>
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">Express Shipping</p>
                  <p className="text-xs text-neutral-500">3-5 Business Days</p>
                </div>
              </div>
              <span className="font-bold text-dark">$35.00</span>
            </label>
          </div>
        </div>

        <label className="flex items-center space-x-3 cursor-pointer group">
          <input type="checkbox" {...register("saveAddress")} className="accent-primary h-4 w-4" />
          <span className="text-xs text-neutral-500 group-hover:text-dark transition-colors">Save address to my account</span>
        </label>

        <button type="submit" className="w-full bg-dark text-white py-5 rounded-2xl font-athletic font-bold uppercase tracking-widest text-lg hover:bg-primary transition-all">
          Continue to Payment
        </button>
      </form>
    </motion.div>
  );
}
