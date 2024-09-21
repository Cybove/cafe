import { Database } from "bun:sqlite";

const db = new Database("db.sqlite", { create: true });

const categoriesTable = db.query(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, color TEXT NOT NULL, sort_order INTEGER DEFAULT 0)"
);
const itemsTable = db.query(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, category_id INTEGER NOT NULL, sort_order INTEGER DEFAULT 0, FOREIGN KEY (category_id) REFERENCES categories(id))"
);
const ordersTable = db.query(
    "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL, order_date TEXT NOT NULL, total_price REAL NOT NULL)"
);

categoriesTable.run();
itemsTable.run();
ordersTable.run();