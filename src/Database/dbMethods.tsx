import { Database } from 'bun:sqlite';
import { Category, MenuItem } from '../Types/types';

const db = new Database('db.sqlite', { readonly: true });

export const getCategories = (): Category[] => {
    return db.query("SELECT * FROM categories").all() as Category[];
};

export const getItems = (): MenuItem[] => {
    return db.query("SELECT * FROM items").all() as MenuItem[];
};

export const getItemById = (itemId: number): MenuItem | undefined => {
    return db.query("SELECT * FROM items WHERE id = ?").get(itemId) as MenuItem;
};
