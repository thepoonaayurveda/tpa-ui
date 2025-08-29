export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
  categories: Category[];
  tags: Tag[];
  images: ProductImage[];
  attributes: Attribute[];
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  meta_data: MetaData[];
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Attribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface ProductReview {
  id: number;
  product_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
  reviewer_avatar_urls: {
    [key: string]: string;
  };
  date_created: string;
  date_created_gmt: string;
  product_name?: string;
  product_slug?: string;
}

export interface Order {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_paid_gmt: string | null;
  date_completed: string | null;
  date_completed_gmt: string | null;
  cart_hash: string;
  meta_data: MetaData[];
  line_items: OrderLineItem[];
  tax_lines: any[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: MetaData[];
  sku: string;
  price: number;
  parent_name: string | null;
}

export interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: MetaData[];
}

export interface CreateOrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: BillingAddress;
  shipping: ShippingAddress;
  line_items: CreateOrderLineItem[];
  shipping_lines: CreateShippingLine[];
}

export interface CreateOrderLineItem {
  product_id: number;
  quantity: number;
}

export interface CreateShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

export interface ShippingZone {
  id: number;
  name: string;
  order: number;
  locations: ShippingLocation[];
  methods: ShippingMethod[];
}

export interface ShippingLocation {
  code: string;
  type: string;
}

export interface ShippingMethod {
  id: number;
  instance_id: number;
  title: string;
  order: number;
  enabled: boolean;
  method_id: string;
  method_title: string;
  method_description: string;
  settings: ShippingMethodSettings;
}

export interface ShippingMethodSettings {
  [key: string]: ShippingMethodSetting;
}

export interface ShippingMethodSetting {
  id: string;
  label: string;
  description: string;
  type: string;
  value: string;
  default: string;
  tip: string;
  placeholder: string;
}

export interface ShippingCalculationRequest {
  destination: {
    country: string;
    state: string;
    postcode: string;
    city: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
}

export interface ShippingCalculationResponse {
  methods: Array<{
    method_id: string;
    method_title: string;
    cost: number;
    instance_id?: number;
  }>;
}
