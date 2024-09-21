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

export { Category, MenuItem };