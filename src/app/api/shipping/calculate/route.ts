import { NextRequest, NextResponse } from "next/server";
import { calculateShipping } from "@/lib/woocommerce";
import { ShippingCalculationRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const data: ShippingCalculationRequest = await request.json();

    // Validate required fields
    if (!data.destination || !data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: "Missing required shipping calculation data" },
        { status: 400 }
      );
    }

    // Validate destination
    if (!data.destination.country || !data.destination.postcode) {
      return NextResponse.json(
        { error: "Country and postcode are required for shipping calculation" },
        { status: 400 }
      );
    }

    // Calculate shipping via WooCommerce API
    const shippingOptions = await calculateShipping(data);

    return NextResponse.json(shippingOptions);
  } catch (error: any) {
    console.error("Error calculating shipping:", error);
    return NextResponse.json(
      { error: error.message || "Failed to calculate shipping" },
      { status: 500 }
    );
  }
}