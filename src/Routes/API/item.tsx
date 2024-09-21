import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { insertItem, deleteItem, updateItem, getItemById, getItemsByCategory } from '../../Database/dbMethods';
import { MenuItem } from '../../Types/types';

export const item = (app: Elysia) => {
    app.post('/api/items', ({ body }: { body: { name: string; description: string; price: string; category: string } }) => {
        const item: MenuItem = {
            id: 0,
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            category_id: parseInt(body.category),
            sort_order: 0,
        };
        insertItem(item);
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Item added successfully!
            </div>
        );
    });

    app.post('/api/items/move', ({ body }: { body: { itemId: string; newCategoryId: string; newIndex: string } }) => {
        const existingItem = getItemById(parseInt(body.itemId));
        if (existingItem) {
            const updatedItem: MenuItem = {
                ...existingItem,
                category_id: parseInt(body.newCategoryId),
                sort_order: parseInt(body.newIndex)
            };
            updateItem(updatedItem);

            const categoryItems = getItemsByCategory(parseInt(body.newCategoryId));
            categoryItems
                .filter(item => item.id !== updatedItem.id)
                .sort((a, b) => a.sort_order - b.sort_order)
                .forEach((item, index) => {
                    const newOrder = index >= updatedItem.sort_order ? index + 1 : index;
                    updateItem({ ...item, sort_order: newOrder });
                });

            return (
                <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                    _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                    Item moved and order updated successfully!
                </div>
            );
        }
    });

    app.post('/api/items/sort', ({ body }: { body: { categoryId: string, items: string } }) => {
        const existingCategory = getItemById(parseInt(body.categoryId));
        if (existingCategory) {
            const items = JSON.parse(body.items);
            items.forEach((item: { id: string; sort_order: string; }) => {
                const updatedItem: MenuItem = {
                    ...existingCategory,
                    sort_order: parseInt(item.sort_order)
                };
                updateItem(updatedItem);
            });
        }
        else {
            const items = JSON.parse(body.items);
            items.forEach((item: { id: string; sort_order: string; }) => {
                const existingItem = getItemById(parseInt(item.id));
                if (existingItem) {
                    const updatedItem: MenuItem = {
                        ...existingItem,
                        sort_order: parseInt(item.sort_order)
                    };
                    updateItem(updatedItem);
                }
            });
        }
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Items sorted successfully!
            </div>
        );
    });

    app.delete('/api/items/:id', ({ params: { id } }) => {
        deleteItem(parseInt(id));
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Item deleted successfully!
            </div>
        );
    });

    app.put('/api/items', ({ body }: { body: { id: string; name: string; description: string; price: string; category: string; sort_order: string } }) => {
        const item: MenuItem = {
            id: parseInt(body.id),
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            category_id: parseInt(body.category),
            sort_order: parseInt(body.sort_order)
        };
        updateItem(item);
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Item updated successfully!
            </div>
        );
    });

    return app;
};


