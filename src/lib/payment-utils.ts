// Utility functions for payment status detection

export interface PaymentUrlParams {
  orderId?: string | null;
  transactionId?: string | null;
  code?: string | null;
  providerReferenceId?: string | null;
  status?: string | null;
  error?: string | null;
  [key: string]: string | null | undefined;
}

export function detectPaymentStatus(params: PaymentUrlParams): {
  status: 'success' | 'failed' | 'pending';
  confidence: 'high' | 'medium' | 'low';
  reason: string;
} {
  const {
    code,
    providerReferenceId,
    orderId,
    transactionId,
    status,
    error
  } = params;
  
  console.log("Payment status detection:", { code, status, orderId, transactionId });

  // High confidence success indicators
  if (code === 'PAYMENT_SUCCESS') {
    return {
      status: 'success',
      confidence: 'high',
      reason: 'PhonePe code parameter indicates success'
    };
  }

  // High confidence failure indicators
  if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED' || code === 'PAYMENT_CANCELLED' || error) {
    return {
      status: 'failed',
      confidence: 'high',
      reason: `PhonePe indicates failure: ${code || error}`
    };
  }

  // Check for other common PhonePe success patterns
  if (status === 'SUCCESS' || status === 'COMPLETED') {
    return {
      status: 'success',
      confidence: 'high',
      reason: 'Status parameter indicates success'
    };
  }

  if (status === 'FAILED' || status === 'ERROR' || status === 'CANCELLED') {
    return {
      status: 'failed',
      confidence: 'high',
      reason: 'Payment Failed'
    };
  }

  // Medium confidence success indicators - require both providerReferenceId AND transactionId
  if (providerReferenceId && transactionId && orderId && !error) {
    return {
      status: 'success',
      confidence: 'medium',
      reason: 'Provider reference ID and transaction ID present with order ID and no error'
    };
  }

  // If only orderId is present without transaction details, it's likely a cancellation
  if (orderId && !transactionId && !providerReferenceId && !code) {
    return {
      status: 'failed',
      confidence: 'medium',
      reason: 'Payment Cancelled'
    };
  }

  // Default to pending if we can't determine
  console.log("Unable to determine payment status from parameters");
  
  return {
    status: 'pending',
    confidence: 'low',
    reason: 'Unable to determine payment status'
  };
}

export function logPaymentParameters(searchParams: URLSearchParams) {
  const params: PaymentUrlParams = {};
  
  // Extract all parameters
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  console.log('Payment URL parameters:', params);

  return params;
}