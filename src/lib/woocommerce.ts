import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { CreateOrderData, Order, ShippingZone, ShippingCalculationRequest, ShippingCalculationResponse } from "./types";

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL!,
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
  version: "wc/v3",
  queryStringAuth: true
});

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
    const response = await api.post("orders", orderData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(error.response?.data?.message || "Failed to create order");
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
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
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
