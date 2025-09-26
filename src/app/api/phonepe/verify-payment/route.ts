import { NextRequest, NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from "pg-sdk-node";
import { logPhonepeApi, logPaymentError, logOrderUpdate } from "@/lib/logger";

async function updateOrderStatus(orderId: string, status: 'processing' | 'failed', transactionId: string, notes?: string) {
  try {
    const updateUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders/${orderId}/update-status`;
    const updateData = {
      status: status,
      transaction_id: transactionId,
      payment_method: 'phonepe',
      notes: notes,
    };
    
    console.log("🔄 === ORDER STATUS UPDATE API CALL ===");
    console.log("📍 Update URL:", updateUrl);
    console.log("📦 Update Data:", updateData);
    
    const response = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    console.log("📊 Update Response Status:", response.status);
    console.log("📋 Update Response Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Order update failed:", {
        status: response.status,
        statusText: response.statusText,
        responseBody: errorText,
        orderId: orderId
      });
      throw new Error(`Failed to update order status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Order update successful:", {
      orderId: orderId,
      newStatus: status,
      result: result,
      timestamp: new Date().toISOString()
    });
    
    return result;
  } catch (error) {
    console.error("💥 Error updating order status:", {
      orderId: orderId,
      targetStatus: status,
      transactionId: transactionId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    logPhonepeApi("🔍 === PHONEPE VERIFICATION API START ===");
    
    const requestBody = await request.json();
    const { transactionId, orderId } = requestBody;
    
    logPhonepeApi("📡 Payment verification request:", {
      transactionId,
      orderId,
      fullRequestBody: requestBody,
      environment: process.env.PHONEPE_ENVIRONMENT
    });

    // Validate PhonePe credentials
    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const environment = process.env.PHONEPE_ENVIRONMENT || "SANDBOX";

    logPhonepeApi("🔑 PhonePe Configuration:", {
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
      environment: environment,
      clientIdLength: clientId?.length,
      secretLength: clientSecret?.length
    });

    if (!clientId || !clientSecret) {
      logPaymentError("❌ PhonePe credentials missing!");
      return NextResponse.json(
        { error: "PhonePe credentials not configured" },
        { status: 500 }
      );
    }

    // Initialize PhonePe SDK client using singleton pattern
    const env = environment === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX;
    logPhonepeApi("🔄 Initializing PhonePe SDK:", {
      environment: environment,
      sdkEnv: env,
      transactionId: transactionId
    });
    
    const client = StandardCheckoutClient.getInstance(clientId, clientSecret, 1, env);
    logPhonepeApi("✅ PhonePe client initialized");

    // Verify payment status with PhonePe SDK using the correct method
    logPhonepeApi("📡 Calling PhonePe getOrderStatus for transaction:", { transactionId });
    const phonePeResponse = await client.getOrderStatus(transactionId);
    
    logPhonepeApi("📦 Raw PhonePe Response:", {
      response: phonePeResponse,
      hasState: !!phonePeResponse?.state,
      state: phonePeResponse?.state,
      orderId: phonePeResponse?.orderId,
      amount: phonePeResponse?.amount
    });

    // The response structure has state property directly
    if (phonePeResponse && phonePeResponse.state) {
      logPhonepeApi("✅ PHONEPE RESPONSE RECEIVED - Processing state:", { state: phonePeResponse.state });
      
      // Update order status if orderId is provided
      if (orderId) {
        logOrderUpdate("🔄 UPDATING ORDER STATUS for order:", { orderId });
        
        try {
          let orderStatus: 'processing' | 'failed' | undefined;
          let notes = '';

          switch (phonePeResponse.state) {
            case 'COMPLETED':
              logOrderUpdate("🎉 PAYMENT COMPLETED - Setting order to processing");
              orderStatus = 'processing';
              notes = `Payment verified and completed. Amount: ₹${phonePeResponse.amount/100}. Order ID: ${phonePeResponse.orderId}`;
              break;
            case 'FAILED':
              logOrderUpdate("❌ PAYMENT FAILED - Setting order to failed");
              orderStatus = 'failed';
              notes = `Payment verification failed. Order ID: ${phonePeResponse.orderId}`;
              break;
            case 'PENDING':
              logOrderUpdate("⏳ PAYMENT PENDING - Not updating order status", { orderId });
              orderStatus = undefined; // Don't update if still pending
              break;
            default:
              logPaymentError("⚠️ UNHANDLED PAYMENT STATE:", { state: phonePeResponse.state, orderId });
              orderStatus = undefined;
              break;
          }
          
          console.log("📝 Order status decision:", {
            orderId,
            phonePeState: phonePeResponse.state,
            orderStatus,
            notes,
            willUpdate: !!orderStatus
          });

          if (orderStatus) {
            console.log("📡 CALLING ORDER UPDATE API:", {
              orderId,
              orderStatus,
              transactionId,
              notes: notes.substring(0, 100) + "..."
            });
            
            await updateOrderStatus(orderId, orderStatus, transactionId, notes);
            console.log("✅ ORDER STATUS UPDATED SUCCESSFULLY:", {
              orderId,
              newStatus: orderStatus,
              timestamp: new Date().toISOString()
            });
          } else {
            console.log("⏭️ SKIPPING ORDER UPDATE - No status change needed for:", orderId);
          }
        } catch (updateError) {
          console.error("❌ FAILED TO UPDATE ORDER:", {
            orderId,
            error: updateError instanceof Error ? updateError.message : String(updateError),
            stack: updateError instanceof Error ? updateError.stack : undefined,
            timestamp: new Date().toISOString()
          });
          // Continue with response even if update fails
        }
      } else {
        console.log("⚠️ NO ORDER ID PROVIDED - Skipping order status update");
      }
      
      const successResponse = {
        success: true,
        status: phonePeResponse.state,
        orderId: phonePeResponse.orderId,
        amount: phonePeResponse.amount,
        expireAt: phonePeResponse.expireAt
      };
      
      console.log("✅ VERIFICATION SUCCESS - Returning response:", {
        ...successResponse,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json(successResponse);
    } else {
      console.error("❌ NO VALID PHONEPE RESPONSE:", {
        response: phonePeResponse,
        hasResponse: !!phonePeResponse,
        hasState: !!phonePeResponse?.state,
        responseKeys: phonePeResponse ? Object.keys(phonePeResponse) : 'null',
        timestamp: new Date().toISOString()
      });
      
      // If verification failed and orderId is provided, mark order as failed
      if (orderId) {
        console.log("🔄 MARKING ORDER AS FAILED due to invalid response:", orderId);
        try {
          await updateOrderStatus(orderId, 'failed', transactionId, `Payment verification failed - no valid response`);
          console.log("✅ ORDER MARKED AS FAILED:", orderId);
        } catch (updateError) {
          console.error("❌ FAILED TO MARK ORDER AS FAILED:", {
            orderId,
            error: updateError instanceof Error ? updateError.message : String(updateError),
            timestamp: new Date().toISOString()
          });
        }
      }

      const errorResponse = {
        success: false,
        error: "Payment verification failed - no valid response"
      };
      
      console.log("❌ VERIFICATION FAILED - Returning error response:", errorResponse);
      return NextResponse.json(errorResponse);
    }
  } catch (error: any) {
    console.error("💥 PHONEPE VERIFICATION ERROR:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString()
    });
    
    const errorResponse = { error: error.message || "Failed to verify payment" };
    
    console.error("❌ RETURNING ERROR RESPONSE:", {
      ...errorResponse,
      status: 500,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}