import { Database } from "bun:sqlite";

const db = new Database("db.sqlite", { create: true });

const categoriesTable = db.query(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
);
const itemsTable = db.query(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,  description TEXT NOT NULL, price REAL NOT NULL, category_id INTEGER NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(id))"
);
const ordersTable = db.query(
    "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL, order_date TEXT NOT NULL, total_price REAL NOT NULL)"
);

categoriesTable.run();
itemsTable.run();
ordersTable.run();

// Dummy data for categories
const categories = [
    { name: "Appetizers" },
    { name: "Main Course" },
    { name: "Desserts" },
    { name: "Beverages" },
    { name: "Salads" }
];
// Dummy data for items
const items = [
    { name: "Spring Rolls", description: "Crispy rolls filled with vegetables and shrimp", price: 6.99, category_id: 1 },
    { name: "Pad Thai", description: "Stir-fried rice noodles with shrimp, tofu, and peanuts", price: 12.99, category_id: 2 },
    { name: "Mango Sticky Rice", description: "Sweet sticky rice with ripe mango and coconut milk", price: 5.99, category_id: 3 },
    { name: "Green Tea", description: "Refreshing green tea with a hint of jasmine", price: 2.99, category_id: 4 },
    { name: "Caesar Salad", description: "Romaine lettuce, croutons, and Caesar dressing", price: 8.99, category_id: 5 }
];
// Dummy data for orders
const orders = [
    { customer_name: "John Doe", order_date: "2023-07-20", total_price: 50.00 },
    { customer_name: "Jane Smith", order_date: "2023-07-21", total_price: 75.00 },
    { customer_name: "Bob Johnson", order_date: "2023-07-22", total_price: 30.00 }
];

// Insert dummy data into categories table
for (const category of categories) {
    db.query("INSERT INTO categories (name) VALUES (?)").run(category.name);
}

// Insert dummy data into items table
for (const item of items) {
    db.query("INSERT INTO items (name, description, price, category_id) VALUES (?, ?, ?, ?)").run(item.name, item.description, item.price, item.category_id);
}

// Insert dummy data into orders table
for (const order of orders) {
    db.query("INSERT INTO orders (customer_name, order_date, total_price) VALUES (?, ?, ?)").run(order.customer_name, order.order_date, order.total_price);
}