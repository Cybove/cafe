import { getCategories, getItems } from "../Database/dbMethods";
import { Category, MenuItem } from '../Types/types';
import * as elements from 'typed-html';

const MenuItemComponent = (item: MenuItem) => (
    <div class="border-b pb-4 last:border-b-0">
        <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-800">{item.name}</h3>
            <span class="font-bold text-gray-700">{item.price} TL</span>
        </div>
        <p class="text-sm text-gray-600 mt-1">{item.description}</p>
        <button
            class="mt-2 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
            _={`on click
                set cartItems to (localStorage.getItem('cartItems') or '[]')
                set cartItems to JSON.parse(cartItems)
                set now to Date.now()
                set expirationDate to (now + (12 * 60 * 60 * 1000))
                set cartItem to {
                    id: '${item.id}', 
                    name: '${item.name}', 
                    price: ${item.price}, 
                    expiration: expirationDate
                }
                call cartItems.push(cartItem)
                set localStorage.cartItems to JSON.stringify(cartItems)
                trigger addedToCart`}
            hx-get="/api/cart" hx-trigger="click" hx-swap="innerHTML" hx-target="#cart"
        >
            Add to Cart
        </button>
    </div>
);

const CategoryComponent = (category: Category, items: MenuItem[]) => (
    <div class="bg-white rounded-lg shadow-xl overflow-hidden">
        <div class={`bg-${category.color} text-white p-4 text-center space-x-2 cursor-pointer`}
            _="on click
                add .animate__animated to me
                add .animate__heartBeat to me
                remove .animate__headShake from me
                get the next <div/>
                if it matches .hidden
                    remove .hidden from it
                    add .animate__bounceInRight to it
                else
                    add .animate__headShake to me
                    remove .animate__bounceInRight from it
                    remove .animate__heartBeat from me
                    add .hidden to it
                end">
            <h2 class="text-xl font-bold">{category.name}</h2>
        </div>
        <div class="p-4 px-8 hidden animate__animated">
            <div class="space-y-4">
                {items.sort((a, b) => a.sort_order - b.sort_order).map(item => MenuItemComponent(item))}
            </div>
        </div>
    </div>
);


export const Menu = () => {
    const categories: Category[] = getCategories();
    const items: MenuItem[] = getItems();

    return (
        <div>
            <h1 class="text-4xl font-bold text-center mb-8 text-gray-800" style="font-family: 'Pacifico', cursive;">
                Our Delightful Menu
            </h1>
            <div class="grid gap-8 max-w-6xl mx-auto">
                {categories.sort((a, b) => a.sort_order - b.sort_order).map(category => {
                    const categoryItems = items.filter(item => item.category_id === category.id);
                    return CategoryComponent(category, categoryItems);
                })}
            </div>
        </div>
    );
};
