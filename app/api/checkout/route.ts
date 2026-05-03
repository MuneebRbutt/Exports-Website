import { NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/stripe/checkout";

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const { clientSecret } = await createPaymentIntent(amount, currency || "usd");

    return NextResponse.json({ clientSecret });
  } catch (error: unknown) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
