import { Database } from "bun:sqlite";
import { Category, MenuItem, Order, OrderItem } from "../Types/types";

const db = new Database("db.sqlite");

export const getCategories = (): Category[] => {
  return db.query("SELECT * FROM categories").all() as Category[];
};

export const getItems = (): MenuItem[] => {
  return db.query("SELECT * FROM items").all() as MenuItem[];
};

export const getItemById = (itemId: number): MenuItem | undefined => {
  return db.query("SELECT * FROM items WHERE id = ?").get(itemId) as MenuItem;
};

export const getItemsByCategory = (categoryId: number): MenuItem[] => {
  return db.query(
    "SELECT * FROM items WHERE category_id = ? ORDER BY sort_order",
  ).all(categoryId) as MenuItem[];
};

export const insertCategory = (category: Category): void => {
  db.query("INSERT INTO categories (name, color, sort_order) VALUES (?, ?, ?)")
    .run(category.name, category.color, category.sort_order);
};

export const insertItem = (item: MenuItem): void => {
  db.query(
    "INSERT INTO items (name, description, price, category_id) VALUES (?, ?, ?, ?)",
  ).run(item.name, item.description, item.price, item.category_id);
};

export const updateCategory = (category: Category): void => {
  db.query("UPDATE categories SET name = ?, color = ? WHERE id = ?").run(
    category.name,
    category.color,
    category.id,
  );
};

export const updateCategorySortOrder = (
  categoryId: number,
  newSortOrder: number,
): void => {
  db.query("UPDATE categories SET sort_order = ? WHERE id = ?").run(
    newSortOrder,
    categoryId,
  );
};

export const updateItem = (item: MenuItem): void => {
  db.query(
    "UPDATE items SET name = ?, description = ?, price = ?, category_id = ?, sort_order = ? WHERE id = ?",
  ).run(
    item.name,
    item.description,
    item.price,
    item.category_id,
    item.sort_order,
    item.id,
  );
};

export const deleteCategory = (categoryId: number): void => {
  db.query("DELETE FROM categories WHERE id = ?").run(categoryId);
};

export const deleteItem = (itemId: number): void => {
  db.query("DELETE FROM items WHERE id = ?").run(itemId);
};

export const getOrder = (customerToken: string): Order => {
  return db.query("SELECT * FROM orders WHERE customer_token = ?").get(customerToken) as Order;
};

export const insertOrder = (order: Order): number => {
  const result = db.query(
    "INSERT INTO orders (customer_token, status, created_at) VALUES (?, ?, ?)"
  ).run(order.customer_token, order.status, order.created_at);
  return result.lastInsertRowid as number;
};

export const insertOrderItem = (orderItem: OrderItem): void => {
  db.query("INSERT INTO order_items (customer_token, item_id, price) VALUES (?, ?, ?)").run(orderItem.customer_token, orderItem.item_id, orderItem.price);
};

export const updateOrder = (order: Order): void => {
  db.query(
    "UPDATE orders SET status = ? WHERE customer_token = ?"
  ).run(order.status, order.customer_token);
};

export const updateOrderItem = (orderItem: OrderItem): void => {
  db.query(
    "UPDATE order_items SET price = ? WHERE customer_token = ? AND item_id = ?"
  ).run(orderItem.price, orderItem.customer_token, orderItem.item_id);
};

export const deleteOrder = (customerToken: string): void => {
  db.query("DELETE FROM orders WHERE customer_token = ?").run(customerToken);
};

export const deleteOrderItem = (customerToken: string, itemId: number): void => {
  db.query("DELETE FROM order_items WHERE rowid = ( SELECT rowid  FROM order_items WHERE customer_token = ? AND item_id = ? LIMIT 1)").run(customerToken, itemId);
};

export const getOrders = (): Order[] => {
  return db.query("SELECT * FROM orders").all() as Order[];
};

export const getAllOrderItems = (): OrderItem[] => {
  const orderItems = db.query("SELECT * FROM order_items").all() as OrderItem[];
  return orderItems.map(item => {
    const menuItem = getItemById(item.item_id);
    return {
      ...item,
      name: menuItem ? menuItem.name : `Item ${item.item_id}`
    };
  });
};

export const getOrderItems = (customerToken: string): OrderItem[] => {
  const orderItems = db.query("SELECT * FROM order_items WHERE customer_token = ?").all(customerToken) as OrderItem[];
  return orderItems.map(item => {
    const menuItem = getItemById(item.item_id);
    return {
      ...item,
      name: menuItem ? menuItem.name : `Item ${item.item_id}`
    };
  });
};

export function cleanDatabase() {
  const twelvehours = 12 * 60 * 60 * 1000;
  const cutoffTime = new Date(Date.now() - twelvehours).toISOString();

  db.transaction(() => {
    const deletedOrders = db.query("DELETE FROM orders WHERE created_at < ? RETURNING *").all(cutoffTime);
    const deletedOrderItems = db.query("DELETE FROM order_items WHERE customer_token NOT IN (SELECT customer_token FROM orders) RETURNING *").all();

    console.log(`Database cleaned: ${deletedOrders.length} orders and ${deletedOrderItems.length} order items removed.`);
  })();
}

export function startDatabaseCleaning() {
  const cleaningInterval = 12 * 60 * 60 * 1000;

  const runCleaning = () => {
    console.log("Starting database cleaning...");
    cleanDatabase();
    console.log("Database cleaning completed. Next cleaning scheduled in 12 hours.");
  };

  runCleaning();
  setInterval(runCleaning, cleaningInterval);
}
