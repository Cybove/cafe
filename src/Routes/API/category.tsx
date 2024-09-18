import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { deleteCategory, getCategories, insertCategory, updateCategory } from '../../Database/dbMethods';
import { Category } from '../../Types/types';

export const categories = (app: Elysia) => {
    app.get('/api/categories', () =>
        <select hx-get="/api/categories" hx-trigger="refreshMenuList from:body" hx-swap="outerHTML" hx-target="this" required id="category-select" name="category" class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" >
            {getCategories().map(category => (
                <option value={category.id.toString()}>{category.name}</option>
            ))}
        </select>

    );

    app.post('/api/categories', ({ body }: { body: { name: string; } }) => {
        const category: Category = {
            id: 0,
            name: body.name
        };
        insertCategory(category);
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Category added successfully!
            </div>
        );
    });

    app.put('/api/category', ({ body }: { body: { id: string; name: string; } }) => {
        const category: Category = {
            id: parseInt(body.id),
            name: body.name
        };
        updateCategory(category);
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Category updated successfully!
            </div>
        );
    });

    app.delete('/api/category/:id', ({ params: { id } }) => {
        deleteCategory(parseInt(id));
        return (
            <div class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
                _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me">
                Item deleted successfully!
            </div>
        );
    });

    return app;
};
