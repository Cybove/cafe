import { Database } from 'bun:sqlite';
import { Category, MenuItem } from '../Types/types';

const db = new Database('db.sqlite');

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
    return db.query("SELECT * FROM items WHERE category_id = ?").all(categoryId) as MenuItem[];
};

export const insertCategory = (category: Category): void => {
    db.query("INSERT INTO categories (name, color) VALUES (?, ?)").run(category.name, category.color);
};
export const insertItem = (item: MenuItem): void => {
    db.query("INSERT INTO items (name, description, price, category_id) VALUES (?, ?, ?, ?)").run(item.name, item.description, item.price, item.category_id);
};

export const updateCategory = (category: Category): void => {
    db.query("UPDATE categories SET name = ?, color = ? WHERE id = ?").run(category.name, category.color, category.id);
};
export const updateItem = (item: MenuItem): void => {
    db.query("UPDATE items SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?").run(item.name, item.description, item.price, item.category_id, item.id);
};

export const deleteCategory = (categoryId: number): void => {
    console.log(db.query("DELETE FROM categories WHERE id = ?").run(categoryId));
};
export const deleteItem = (itemId: number): void => {
    db.query("DELETE FROM items WHERE id = ?").run(itemId);
};
