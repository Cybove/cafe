interface Category {
  id: number;
  name: string;
  color: string;
  sort_order: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  sort_order: number;
}

interface Order {
  id?: number;
  customer_token: string;
  status: boolean;
  created_at: string;
}

interface OrderItem {
  id?: number;
  customer_token: string;
  item_id: number;
  price: number;
  name?: string;
}


export { Category, MenuItem, Order, OrderItem };
