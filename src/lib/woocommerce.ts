import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { CreateOrderData, Order, ShippingZone, ShippingCalculationRequest, ShippingCalculationResponse, Coupon, CouponValidationRequest, AppliedCoupon } from "./types";

// Validate environment variables
if (!process.env.NEXT_PUBLIC_WC_URL || !process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
  console.error("Missing WooCommerce environment variables:", {
    url: !!process.env.NEXT_PUBLIC_WC_URL,
    key: !!process.env.WC_CONSUMER_KEY,
    secret: !!process.env.WC_CONSUMER_SECRET
  });
}


const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
  queryStringAuth: true,
  timeout: 30000, // 30 second timeout
  axiosConfig: {
    headers: {
      'User-Agent': 'NextJS-WooCommerce-Client',
      'Content-Type': 'application/json'
    }
  }
});

// Helper function to handle API errors
const handleApiError = (error: any, operation: string) => {
  console.error(`WooCommerce API Error (${operation}):`, {
    message: error.message,
    code: error.code,
    response: error.response?.data,
    status: error.response?.status,
    url: process.env.NEXT_PUBLIC_WC_URL
  });

  // Check if response is HTML (common when API endpoint is not found)
  const responseData = error.response?.data;
  if (typeof responseData === 'string' && responseData.includes('<!DOCTYPE')) {
    throw new Error(`API endpoint returned HTML instead of JSON. This usually means the WooCommerce API is not accessible at ${process.env.NEXT_PUBLIC_WC_URL}`);
  }

  // Re-throw with original error or more descriptive message
  throw error;
};

export const getProducts = async (params?: any) => {
  try {
    const response = await api.get("products", {
      per_page: 20,
      status: 'publish',
      ...params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const products = await getProducts({ slug, per_page: 1 });
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("products/categories", {
      per_page: 50,
      hide_empty: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getProductReviews = async (params?: any) => {
  try {
    const response = await api.get("products/reviews", {
      per_page: 20,
      status: 'approved',
      orderby: 'date',
      order: 'desc',
      ...params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return [];
  }
};

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  try {
    // Validate required billing fields
    const requiredBillingFields = ['first_name', 'last_name', 'email', 'address_1', 'city', 'state', 'postcode', 'country'];
    const missingBillingFields = requiredBillingFields.filter(field => !orderData.billing?.[field as keyof typeof orderData.billing]);
    
    if (missingBillingFields.length > 0) {
      throw new Error(`Missing required billing fields: ${missingBillingFields.join(', ')}`);
    }
    
    if (!orderData.line_items || orderData.line_items.length === 0) {
      throw new Error('Order must contain at least one line item');
    }
    
    // Validate that all line items have required fields
    const invalidLineItems = orderData.line_items?.filter(item => 
      !item.product_id || !item.name || !item.quantity || item.quantity <= 0
    );
    
    if (invalidLineItems && invalidLineItems.length > 0) {
      throw new Error(`Invalid line items found: ${JSON.stringify(invalidLineItems)}`);
    }

    // Create the actual order with explicit field mapping
    const wcOrderData = {
      payment_method: orderData.payment_method,
      payment_method_title: orderData.payment_method_title,
      status: orderData.status || 'pending',
      set_paid: orderData.set_paid || false,
      
      // Billing address with explicit mapping
      billing: {
        first_name: String(orderData.billing.first_name || ''),
        last_name: String(orderData.billing.last_name || ''),
        company: String(orderData.billing.company || ''),
        address_1: String(orderData.billing.address_1 || ''),
        address_2: String(orderData.billing.address_2 || ''),
        city: String(orderData.billing.city || ''),
        state: String(orderData.billing.state || ''),
        postcode: String(orderData.billing.postcode || ''),
        country: String(orderData.billing.country || 'IN'),
        email: String(orderData.billing.email || ''),
        phone: String(orderData.billing.phone || '')
      },
      
      // Shipping address with explicit mapping
      shipping: {
        first_name: String(orderData.shipping.first_name || ''),
        last_name: String(orderData.shipping.last_name || ''),
        company: String(orderData.shipping.company || ''),
        address_1: String(orderData.shipping.address_1 || ''),
        address_2: String(orderData.shipping.address_2 || ''),
        city: String(orderData.shipping.city || ''),
        state: String(orderData.shipping.state || ''),
        postcode: String(orderData.shipping.postcode || ''),
        country: String(orderData.shipping.country || 'IN')
      },
      
      // Line items with proper structure
      line_items: orderData.line_items.map(item => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
        meta_data: [
          {
            key: '_product_name',
            value: String(item.name || '')
          }
        ]
      })),
      
      // Customer note
      customer_note: String(orderData.customer_note || ''),
      
      // Meta data
      meta_data: orderData.meta_data || []
    };

    
    const response = await api.post("orders", wcOrderData);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'createOrder');
    
    // Provide more specific error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.code || 
                        error.message || 
                        "Failed to create order";
    throw new Error(errorMessage);
  }
};

export const getOrder = async (orderId: number): Promise<Order | null> => {
  try {
    const response = await api.get(`orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

export const updateOrder = async (orderId: number, data: Partial<CreateOrderData>): Promise<Order | null> => {
  try {
    const response = await api.put(`orders/${orderId}`, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error, 'updateOrder');
    
    // Provide more specific error message
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.code || 
                        error.message || 
                        "Failed to update order";
    throw new Error(errorMessage);
  }
};

export const getShippingZones = async (): Promise<ShippingZone[]> => {
  try {
    const response = await api.get("shipping/zones");
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping zones:", error);
    return [];
  }
};

export const getShippingZone = async (zoneId: number): Promise<ShippingZone | null> => {
  try {
    const response = await api.get(`shipping/zones/${zoneId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping zone:", error);
    return null;
  }
};

export const getShippingMethods = async (zoneId: number) => {
  try {
    const response = await api.get(`shipping/zones/${zoneId}/methods`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return [];
  }
};

// Calculate shipping costs for given destination and items
export const calculateShipping = async (request: ShippingCalculationRequest): Promise<ShippingCalculationResponse> => {
  try {
    // Get all shipping zones
    const zones = await getShippingZones();
    
    // Find the appropriate zone for the destination
    let applicableZone = null;
    
    for (const zone of zones) {
      // Check if destination matches any location in this zone
      if (!zone.locations || !Array.isArray(zone.locations)) {
        continue;
      }
      
      const matchesZone = zone.locations.some(location => {
        if (location.type === 'country' && location.code === request.destination.country) {
          return true;
        }
        if (location.type === 'state' && location.code === `${request.destination.country}:${request.destination.state}`) {
          return true;
        }
        if (location.type === 'postcode') {
          // Simple postcode matching - you might need more complex logic
          return location.code === request.destination.postcode;
        }
        return false;
      });
      
      if (matchesZone) {
        applicableZone = zone;
        break;
      }
    }
    
    // If no specific zone found, try to find a "Rest of the World" or default zone
    if (!applicableZone) {
      applicableZone = zones.find(zone => 
        !zone.locations || 
        zone.locations.length === 0 || 
        zone.locations.some(loc => loc.type === 'country' && loc.code === '')
      );
    }
    
    if (!applicableZone) {
      return { methods: [] };
    }
    
    // Get methods for the applicable zone
    const methods = await getShippingMethods(applicableZone.id);
    
    // Convert methods to our response format
    const shippingMethods = methods
      .filter((method: any) => method.enabled)
      .map((method: any) => {
        let cost = 0;
        
        // Calculate cost based on method type
        if (method.method_id === 'free_shipping') {
          cost = 0;
        } else if (method.method_id === 'flat_rate') {
          // Get flat rate cost from settings
          const costSetting = method.settings?.cost?.value || '0';
          cost = parseFloat(costSetting);
        } else if (method.method_id === 'local_pickup') {
          cost = 0;
        }
        // Add more method types as needed
        
        return {
          method_id: method.method_id,
          method_title: method.title,
          cost: cost,
          instance_id: method.instance_id,
        };
      });
    
    return { methods: shippingMethods };
  } catch (error) {
    console.error("Error calculating shipping:", error);
    return { methods: [] };
  }
};

// Coupon functions
export const getCoupon = async (code: string): Promise<Coupon | null> => {
  try {
    const response = await api.get(`coupons`, {
      code: code,
      per_page: 1
    });
    
    const coupons = response.data;
    if (coupons && coupons.length > 0) {
      return coupons[0];
    }
    return null;
  } catch (error: any) {
    handleApiError(error, 'getCoupon');
    return null;
  }
};

export const validateCoupon = async (request: CouponValidationRequest): Promise<AppliedCoupon | null> => {
  try {
    const coupon = await getCoupon(request.code);
    
    if (!coupon) {
      throw new Error("Coupon not found");
    }

    // Check if coupon is active (WooCommerce doesn't have an 'active' field, so we check other conditions)
    const now = new Date();
    if (coupon.date_expires && new Date(coupon.date_expires) < now) {
      throw new Error("Coupon has expired");
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      throw new Error("Coupon usage limit exceeded");
    }

    // Check minimum amount (only if set and greater than 0)
    const minAmount = parseFloat(coupon.minimum_amount || "0");
    if (minAmount > 0 && request.subtotal < minAmount) {
      throw new Error(`Minimum order amount of ₹${coupon.minimum_amount} required`);
    }

    // Check maximum amount (only if set and greater than 0)
    const maxAmount = parseFloat(coupon.maximum_amount || "0");
    if (maxAmount > 0 && request.subtotal > maxAmount) {
      throw new Error(`Maximum order amount of ₹${coupon.maximum_amount} exceeded`);
    }

    // Check product restrictions (basic check - can be enhanced)
    if (coupon.product_ids.length > 0) {
      const hasValidProduct = request.items.some(item => 
        coupon.product_ids.includes(item.product_id)
      );
      if (!hasValidProduct) {
        throw new Error("Coupon is not applicable to items in your cart");
      }
    }

    // Check excluded products
    if (coupon.excluded_product_ids.length > 0) {
      const hasExcludedProduct = request.items.some(item => 
        coupon.excluded_product_ids.includes(item.product_id)
      );
      if (hasExcludedProduct) {
        throw new Error("Coupon cannot be applied to some items in your cart");
      }
    }

    // Calculate discount
    let discount = 0;
    const couponAmount = parseFloat(coupon.amount);

    switch (coupon.discount_type) {
      case 'percent':
        discount = (request.subtotal * couponAmount) / 100;
        break;
      case 'fixed_cart':
        discount = couponAmount;
        break;
      case 'fixed_product':
        // For fixed product discount, apply to each applicable product
        discount = request.items.reduce((total, item) => {
          if (coupon.product_ids.length === 0 || coupon.product_ids.includes(item.product_id)) {
            return total + (couponAmount * item.quantity);
          }
          return total;
        }, 0);
        break;
    }

    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, request.subtotal);

    return {
      code: coupon.code,
      discount: discount,
      discountType: coupon.discount_type,
      description: coupon.description,
      originalAmount: couponAmount
    };

  } catch (error: any) {
    console.error("Error validating coupon:", error);
    throw new Error(error.message || "Failed to validate coupon");
  }
};

