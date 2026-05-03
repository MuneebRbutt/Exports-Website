"use client";

import { Check, Truck, CreditCard, Eye, Package } from "lucide-react";

export default function CheckoutStepper({ currentStep }: { currentStep: number }) {
  const steps = [
    { name: "Shipping", icon: Truck },
    { name: "Payment", icon: CreditCard },
    { name: "Review", icon: Eye },
    { name: "Confirm", icon: Package },
  ];

  return (
    <div className="flex items-center justify-center w-full mb-16 px-4 overflow-x-auto no-scrollbar py-4">
      <div className="flex items-center space-x-4 md:space-x-8">
        {steps.map((step, i) => (
          <div key={step.name} className="flex items-center">
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  i < currentStep 
                    ? "bg-primary border-primary text-white" 
                    : i === currentStep 
                      ? "border-primary text-primary shadow-lg shadow-primary/20 scale-110" 
                      : "border-neutral-200 text-neutral-300"
                }`}
              >
                {i < currentStep ? <Check className="h-5 w-5 md:h-6 md:w-6" /> : <step.icon className="h-5 w-5 md:h-6 md:w-6" />}
              </div>
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3 whitespace-nowrap ${
                i <= currentStep ? "text-dark" : "text-neutral-300"
              }`}>
                {step.name}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 md:w-16 lg:w-24 h-[2px] mb-8 mx-2 rounded-full transition-all duration-500 ${
                i < currentStep ? "bg-primary" : "bg-neutral-200"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
