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
