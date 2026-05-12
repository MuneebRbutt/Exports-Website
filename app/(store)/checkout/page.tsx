"use client";

import { useState } from "react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm, { ShippingFormData } from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";
import { useCart } from "@/hooks/useCart";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { items, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const shippingCost = subtotal > 200 ? 0 : 25;

  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(1);
  };

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: shippingData,
          items: items.map(item => ({
            id: item.id,
            variantId: item.variantId || item.id,
            productId: item.productId,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            name: item.name
          }))
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* 1. PROGRESS STEPPER */}
      <div className="bg-neutral-50 py-12 border-b border-neutral-100">
        <div className="container mx-auto px-4">
          <CheckoutStepper currentStep={step} />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-2">
            {step === 0 && <ShippingForm onNext={handleShippingSubmit} defaultValues={shippingData || undefined} />}
            {step === 1 && <PaymentForm onNext={handlePaymentSubmit} onBack={() => setStep(0)} defaultMethod={paymentMethod} />}
            {step === 2 && (
              <OrderReview 
                onNext={handlePlaceOrder} 
                onBack={() => setStep(1)} 
                shippingData={shippingData} 
                paymentMethod={paymentMethod}
                isPlacingOrder={isPlacingOrder}
              />
            )}
          </div>

          {/* RIGHT: MINI SUMMARY */}
          <div className="space-y-8">
            <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 sticky top-24">
              <h2 className="text-xl font-athletic font-bold italic uppercase mb-6 tracking-tighter text-dark">Your Order</h2>
              
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => {
                  const price = Number(item.price) || 0;
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-20 bg-neutral-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div className="flex-grow">
                        <p className="text-xs font-bold uppercase tracking-tight text-dark line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{item.size} | Qty: {item.quantity}</p>
                        <p className="text-xs font-bold text-primary mt-1">${(price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500 uppercase">Subtotal</span>
                  <span className="text-dark font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500 uppercase">Shipping</span>
                  <span className="text-dark font-bold">{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-neutral-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Total Due</span>
                  <span className="text-3xl font-athletic font-bold italic text-dark">${(subtotal + shippingCost).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-center space-x-4">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-center">Cash on Delivery <br/> Payment Method</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
