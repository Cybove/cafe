import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { GripVertical, Pencil, Trash } from 'lucide-static'
import { getCategories, getItemsByCategory } from '../../Database/dbMethods';
import { MenuItem, Category } from '../../Types/types';

const EditCategoryModal = (category: Category) => {
    return (
        <div id="editCategoryModal" class="fixed inset-0 items-center justify-center z-50 hidden">
            <div class="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4 max-w-xl">
                <h2 class="text-lg font-semibold mb-4">Edit Category</h2>
                <form hx-put="/api/category" hx-trigger="submit" hx-swap="innerHTML" hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList')" hx-target="#toast-container" class="space-y-4">
                    <input class="hidden" id="category-id" name="id" />
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="category-name" name="name" class="mt-1 p-2 border rounded-md w-full" />
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Save
                    </button>
                    <button
                        type="button"
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 ml-2"
                        _="on click
                            add .hidden to #editCategoryModal
                            add .hidden to #modalBackdrop
                            remove .flex from #editCategoryModal
                            "
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

const EditItemModal = (item: MenuItem) => {
    return (
        <div id="editItemModal" class="fixed inset-0 items-center justify-center z-50 hidden">
            <div class="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4 max-w-xl">
                <h2 class="text-lg font-semibold mb-4">Edit Item</h2>
                <form hx-put="/api/items" hx-trigger="submit" hx-swap="innerHTML" hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList')" hx-include="[name]" hx-target="#toast-container" class="space-y-4">
                    <input class="hidden" id="id" name="id" />
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" class="mt-1 p-2 border rounded-md w-full" />
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" class="mt-1 p-2 border rounded-md w-full"></textarea>
                    </div>
                    <div>
                        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                        <input name="price" type="number" step="0.01" id="price" class="mt-1 p-2 border rounded-md w-full" />
                    </div>
                    <div>
                        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="categories"
                            name="category"
                            class="mt-1 p-2 border rounded-md w-full"
                        >
                        </select>
                    </div>

                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Save
                    </button>
                    <button
                        type="button"
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 ml-2"
                        _="on click
                            add .hidden to #editItemModal
                            add .hidden to #modalBackdrop
                            remove .flex from #editItemModal
                            "
                    >
                        Cancel
                    </button>
                </form>
            </div >
        </div>
    );
};

export const menulist = (app: Elysia) => {
    return app.get('/api/menulist', () => {
        const categories = getCategories();
        return (
            <div class="p-6 flex flex-col gap-6">
                <div id="modalBackdrop" class="fixed inset-0 bg-black opacity-50 backdrop-blur-sm hidden" />
                {categories.map((category) => (
                    <div class="rounded-lg border bg-white text-black shadow-sm mb-6">
                        <div class="p-6">
                            <div class="flex flex-row mb-8 items-center">
                                <h3 class="mr-2 whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                                    {category.name}
                                </h3>
                                <div class="flex space-x-2">
                                    <button
                                        class="px-2 py-1 text-sm rounded-full bg-gray-50 text-gray-800 hover:text-gray-950 hover:bg-gray-300 border-gray-400 border"
                                        _={`on click
                                            remove .hidden from #editCategoryModal
                                            remove .hidden from #modalBackdrop
                                            add .flex to #editCategoryModal
                                            set #category-name.value to '${category.name}'
                                            set #category-id.value to '${category.id}'
                                            `}
                                    >
                                        {Pencil}
                                    </button>
                                    <EditCategoryModal {...category} />
                                    <button
                                        hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList')"
                                        hx-delete={`/api/category/${category.id}`}
                                        hx-confirm="Are you sure you want to delete this category?"
                                        hx-trigger="click"
                                        hx-swap="innerHTML"
                                        hx-target="#toast-container"
                                        class="px-2 py-1 text-sm rounded-full bg-red-100 text-red-700 hover:text-red-800 hover:bg-red-200 border-red-300 border"
                                    >
                                        {Trash}
                                    </button>
                                </div>
                            </div>
                            <div class="mt-4">
                                <table class="min-w-full table-fixed border-collapse mt-4">
                                    <thead>
                                        <tr class="border-b text-black/50 transition-colors text-left">
                                            <th class="px-4 py-2 w-[60px]"></th>
                                            <th class="px-4 py-2 font-thin w-[250px]">Name</th>
                                            <th class="px-4 py-2 font-thin w-[350px]">Description</th>
                                            <th class="px-4 py-2 font-thin w-[150px]">Price</th>
                                            <th class="px-4 py-2 font-thin w-[100px]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getItemsByCategory(category.id).map((item) => (
                                            <tr class="border-t transition-colors hover:bg-gray-100">
                                                <td class="h-12 px-4 text-center align-middle w-[60px] py-2">
                                                    {GripVertical}
                                                </td>
                                                <td class="h-12 px-4 text-left align-middle font-serif text-black py-2">{item.name}</td>
                                                <td class="h-12 px-4 text-left align-middle font-sans text-black py-2 truncate max-w-36">{item.description}</td>
                                                <td class="h-12 px-4 text-left align-middle font-extralight text-black py-2">{item.price} TL</td>
                                                <td class="h-12 px-4 text-left align-middle py-2">
                                                    <div class="flex space-x-2">
                                                        <button
                                                            class="px-3 py-2 text-sm rounded-md bg-gray-50 text-gray-800 hover:text-gray-950 hover:bg-gray-300 border-gray-400 border"
                                                            hx-get="/api/categories"
                                                            hx-trigger="click"
                                                            hx-target="#categories"
                                                            hx-swap="outerHTML"
                                                            _={`on click
                                                                remove .hidden from #editItemModal
                                                                remove .hidden from #modalBackdrop
                                                                add .flex to #editItemModal
                                                                set #name.value to '${item.name}'
                                                                set #description.value to '${item.description}'
                                                                set #price.value to '${item.price}'
                                                                set #id.value to '${item.id}'
                                                                set #category-select.value to '${category.id}'
                                                                set #categories.value to '${item.category_id}'

                                                            `}
                                                        >
                                                            {Pencil}
                                                        </button>

                                                        <EditItemModal {...item} />
                                                        <button hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList')" hx-delete={`/api/items/${item.id}`} hx-confirm="Are you sure you want to delete this item?" hx-trigger="click" hx-swap="innerHTML" hx-target="#toast-container" class="px-3 py-2 text-sm rounded-md bg-red-100 text-red-700 hover:text-red-800 hover:bg-red-200 border-red-300 border">
                                                            {Trash}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        );
    });
};
