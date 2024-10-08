import { Elysia } from "elysia";
import * as elements from "typed-html";
import {
  deleteCategory,
  getCategories,
  insertCategory,
  updateCategory,
  updateCategorySortOrder,
} from "../../Database/dbMethods";
import { Category } from "../../Types/types";

export const categories = (app: Elysia) => {
  app.get(
    "/api/categories",
    () => (
      <select
        required
        name="category"
        class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        {getCategories().sort((a, b) => a.sort_order - b.sort_order).map(
          (category) => (
            <option value={category.id.toString()}>{category.name}</option>
          ),
        )}
      </select>
    ),
  );

  app.post(
    "/api/categories",
    ({ body }: { body: { name: string; color: string } }) => {
      const category: Category = {
        id: 0,
        name: body.name,
        color: body.color,
        sort_order: -1,
      };
      insertCategory(category);
      return (
        <div
          class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
          _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me"
        >
          Category added successfully!
        </div>
      );
    },
  );

  app.post(
    "/api/categories/sort",
    ({ body }: { body: { categories: string } }) => {
      const categories: Category[] = JSON.parse(body.categories);
      categories.forEach((category: Category, index: number) => {
        updateCategorySortOrder(category.id, index);
      });
      return (
        <div
          class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
          _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me"
        >
          Categories sorted successfully!
        </div>
      );
    },
  );

  app.put(
    "/api/category",
    ({ body }: { body: { id: string; name: string; color: string } }) => {
      const category: Category = {
        id: parseInt(body.id),
        name: body.name,
        color: body.color,
        sort_order: 0,
      };
      updateCategory(category);
      return (
        <div
          class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
          _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me"
        >
          Category updated successfully!
        </div>
      );
    },
  );

  app.delete("/api/category/:id", ({ params: { id } }) => {
    deleteCategory(parseInt(id));
    return (
      <div
        class="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg animate__animated animate__fadeInUp"
        _="on load wait 3s then add .animate__fadeOutDown then wait 0.5s then remove me"
      >
        Item deleted successfully!
      </div>
    );
  });

  return app;
};
