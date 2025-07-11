import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

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
