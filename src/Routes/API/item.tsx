import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { insertItem, deleteItem, updateItem } from '../../Database/dbMethods';
import { MenuItem } from '../../Types/types';

export const item = (app: Elysia) => {
    app.post('/api/items', ({ body }: { body: { name: string; description: string; price: string; category: string } }) => {
        const item: MenuItem = {
            id: 0,
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            category_id: parseInt(body.category)
        };
        insertItem(item);
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Item added successfully!
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

    app.put('/api/items', ({ body }: { body: { id: string; name: string; description: string; price: string; category: string } }) => {
        const item: MenuItem = {
            id: parseInt(body.id),
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            category_id: parseInt(body.category)
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


