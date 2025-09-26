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
  
  console.log("🎯 === PAYMENT STATUS DETECTION START ===");
  console.log("📋 Detection Parameters:", {
    code,
    providerReferenceId,
    orderId,
    transactionId,
    status,
    error,
    allParamsCount: Object.keys(params).length,
    timestamp: new Date().toISOString()
  });

  // High confidence success indicators
  if (code === 'PAYMENT_SUCCESS') {
    console.log("✅ HIGH CONFIDENCE SUCCESS: PAYMENT_SUCCESS code detected");
    return {
      status: 'success',
      confidence: 'high',
      reason: 'PhonePe code parameter indicates success'
    };
  }

  // High confidence failure indicators
  if (code === 'PAYMENT_ERROR' || code === 'PAYMENT_DECLINED' || code === 'PAYMENT_CANCELLED' || error) {
    console.log("❌ HIGH CONFIDENCE FAILURE: Error/declined/cancelled code detected:", { code, error });
    return {
      status: 'failed',
      confidence: 'high',
      reason: `PhonePe indicates failure: ${code || error}`
    };
  }

  // Check for other common PhonePe success patterns
  if (status === 'SUCCESS' || status === 'COMPLETED') {
    console.log("✅ HIGH CONFIDENCE SUCCESS: Status parameter indicates success:", status);
    return {
      status: 'success',
      confidence: 'high',
      reason: 'Status parameter indicates success'
    };
  }

  if (status === 'FAILED' || status === 'ERROR' || status === 'CANCELLED') {
    console.log("❌ HIGH CONFIDENCE FAILURE: Status parameter indicates failure:", status);
    return {
      status: 'failed',
      confidence: 'high',
      reason: 'Payment Failed'
    };
  }

  // Medium confidence success indicators - require both providerReferenceId AND transactionId
  if (providerReferenceId && transactionId && orderId && !error) {
    console.log("⚠️ MEDIUM CONFIDENCE SUCCESS: All IDs present and no error", {
      providerReferenceId: !!providerReferenceId,
      transactionId: !!transactionId,
      orderId: !!orderId,
      noError: !error
    });
    return {
      status: 'success',
      confidence: 'medium',
      reason: 'Provider reference ID and transaction ID present with order ID and no error'
    };
  }

  // If only orderId is present without transaction details, it's likely a cancellation
  if (orderId && !transactionId && !providerReferenceId && !code) {
    console.log("⚠️ MEDIUM CONFIDENCE FAILURE: Only order ID present, likely cancellation", {
      orderId: !!orderId,
      hasTransactionId: !!transactionId,
      hasProviderReferenceId: !!providerReferenceId,
      hasCode: !!code
    });
    return {
      status: 'failed',
      confidence: 'medium',
      reason: 'Payment Cancelled'
    };
  }

  // Default to pending if we can't determine
  console.log("❓ LOW CONFIDENCE: Unable to determine payment status from parameters", {
    hasCode: !!code,
    hasStatus: !!status,
    hasOrderId: !!orderId,
    hasTransactionId: !!transactionId,
    hasProviderReferenceId: !!providerReferenceId,
    hasError: !!error
  });
  
  const result = {
    status: 'pending' as const,
    confidence: 'low' as const,
    reason: 'Unable to determine payment status'
  };
  
  console.log("🎯 === PAYMENT STATUS DETECTION COMPLETE ===", {
    result,
    timestamp: new Date().toISOString()
  });
  
  return result;
}

export function logPaymentParameters(searchParams: URLSearchParams) {
  const params: PaymentUrlParams = {};
  
  // Common PhonePe parameters
  const commonParams = [
    'orderId',
    'transactionId', 
    'merchantTransactionId',
    'code',
    'providerReferenceId',
    'status',
    'error',
    'amount',
    'checksum'
  ];

  // Extract all parameters
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const commonFound = commonParams.reduce((acc, param) => {
    if (params[param]) acc[param] = params[param];
    return acc;
  }, {} as PaymentUrlParams);

  console.log('🔍 === PAYMENT URL PARAMETERS ANALYSIS ===');
  console.log('📋 Common PhonePe Parameters Found:', {
    count: Object.keys(commonFound).length,
    parameters: commonFound,
    timestamp: new Date().toISOString()
  });
  
  console.log('📦 All URL Parameters:', {
    totalCount: Object.keys(params).length,
    allParameters: params,
    timestamp: new Date().toISOString()
  });

  // Log specific parameter analysis
  console.log('🎯 Parameter Analysis:', {
    hasOrderId: !!params.orderId,
    hasTransactionId: !!params.transactionId,
    hasCode: !!params.code,
    hasStatus: !!params.status,
    hasError: !!params.error,
    hasProviderRef: !!params.providerReferenceId,
    isEmpty: Object.keys(params).length === 0,
    timestamp: new Date().toISOString()
  });

  return params;
}