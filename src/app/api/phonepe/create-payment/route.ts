import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest, MetaInfo } from "pg-sdk-node";

interface CreatePhonePePaymentRequest {
  amount: number;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  redirectUrl: string;
  callbackUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, customerInfo, redirectUrl, callbackUrl }: CreatePhonePePaymentRequest = await request.json();

    // Validate PhonePe credentials
    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const environment = process.env.PHONEPE_ENVIRONMENT || "SANDBOX";

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PhonePe credentials not configured" },
        { status: 500 }
      );
    }

    // Initialize PhonePe SDK client using singleton pattern
    const env = environment === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX;
    const client = StandardCheckoutClient.getInstance(clientId, clientSecret, 1, env);

    // Create meta info for additional data
    const metaInfo = MetaInfo.builder()
        .udf1(customerInfo.name)
        .udf2(customerInfo.email)
        .build();

    // Create payment request using builder pattern
    const payRequest = StandardCheckoutPayRequest.builder()
        .merchantOrderId(orderId)
        .amount(amount * 100) // Convert to paise
        .redirectUrl(redirectUrl)
        .metaInfo(metaInfo)
        .build();

    // Initiate payment
    const response = await client.pay(payRequest);

    if (response && response.redirectUrl) {
      return NextResponse.json({
        success: true,
        paymentUrl: response.redirectUrl,
        transactionId: orderId,
        merchantTransactionId: orderId
      });
    } else {
      return NextResponse.json(
        { error: "Failed to create PhonePe payment - no redirect URL received" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error creating PhonePe payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create PhonePe payment" },
      { status: 500 }
    );
  }
}