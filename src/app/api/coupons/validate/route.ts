import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/woocommerce";
import { CouponValidationRequest, CouponValidationResponse } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: CouponValidationRequest = await request.json();
    
    // Validate request data
    if (!body.code || !body.code.trim()) {
      return NextResponse.json({
        success: false,
        valid: false,
        error: "Coupon code is required"
      } as CouponValidationResponse);
    }

    if (!body.subtotal || body.subtotal <= 0) {
      return NextResponse.json({
        success: false,
        valid: false,
        error: "Invalid subtotal amount"
      } as CouponValidationResponse);
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({
        success: false,
        valid: false,
        error: "No items in cart"
      } as CouponValidationResponse);
    }

    // Validate coupon with WooCommerce
    try {
      const appliedCoupon = await validateCoupon({
        code: body.code.trim().toUpperCase(),
        subtotal: body.subtotal,
        items: body.items
      });

      if (appliedCoupon) {
        return NextResponse.json({
          success: true,
          valid: true,
          coupon: appliedCoupon
        } as CouponValidationResponse);
      } else {
        return NextResponse.json({
          success: true,
          valid: false,
          error: "Invalid coupon code"
        } as CouponValidationResponse);
      }
    } catch (validationError: any) {
      return NextResponse.json({
        success: true,
        valid: false,
        error: validationError.message || "Coupon validation failed"
      } as CouponValidationResponse);
    }

  } catch (error: any) {
    console.error("Error in coupon validation API:", error);
    return NextResponse.json({
      success: false,
      valid: false,
      error: "Internal server error. Please try again."
    } as CouponValidationResponse, { status: 500 });
  }
}