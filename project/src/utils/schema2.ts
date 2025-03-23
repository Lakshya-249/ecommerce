export interface address {
  _id?: string;
  name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  town_city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  default?: boolean;
}

export interface account {
  _id?: string;
  card_number?: string;
  expiry?: string;
  cvv?: string;
  default?: boolean;
}

export interface cart {
  _id?: string;
  user?: string;
  product?: product;
  quantity?: number;
  size?: string;
  color?: string;
  discount?: number;
}

export interface product {
  _id?: string;
  brand?: string;
  totalOrders: number;
  name?: string;
  product_desc?: string;
  product_type?: string;
  amount?: number;
  size?: Array<string>;
  tax?: number;
  category?: string;
  colors?: Array<color>;
  reviews?: Array<review>;
}

export interface color {
  _id?: string;
  product?: string;
  name?: string;
  hex?: string;
  images?: Array<string>;
}

export interface review {
  _id?: string;
  product?: string;
  rating?: number;
  comment?: string;
  user?: {
    _id: string;
    username: string;
    email: string;
    name: string;
  };
}

export interface specifics {
  _id?: string;
  product?: string;
  details?: Array<string>;
}

export interface shoppingInfo {
  _id?: string;
  info?: Array<{ key?: string; value?: string }>;
  additionalInfo?: Array<{ key?: string; value?: string }>;
}

export interface inventory_orderDetails {
  _id: string;
  user: string;
  product: product;
  total_amount: number;
  quantity: number;
  discount: number;
  color: string;
  size: any;
  status: string;
  tax: number;
  order_date: string;
  address: address;
  delivery_date: string;
  payment_method: string;
  payment_status: string;
}

export interface inventory_order {
  _id: string;
  user: string;
  product: product;
  total_amount: number;
  quantity: number;
  discount: number;
  color: string;
  size: any;
  status: string;
  tax: number;
  order_date: string;
  address: {
    _id: string;
    name: string;
  };
}
