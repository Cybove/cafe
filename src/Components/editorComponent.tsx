import * as elements from "typed-html";
import { CirclePlus } from "lucide-static";
import colors from "../Utils/colors";

const AddNewItem = () => {
  return (
    <div class="flex-auto">
      <div class="p-6">
        <div class="rounded-lg border bg-white shadow-sm">
          <div class="flex flex-col space-y-1 p-6">
            <h3 class="whitespace-nowrap text-2xl font-bold text-indigo-600 leading-none tracking-tight">
              Add New Item
            </h3>
          </div>
          <div class="p-6">
            <form
              hx-post="/api/items"
              hx-trigger="submit"
              hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList'); this.reset();"
              hx-target="#toast-container"
              class="space-y-6"
            >
              <div>
                <label class="text-sm font-semibold leading-none">Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm "
                />
              </div>
              <div>
                <label class="text-sm font-semibold leading-none">
                  Description
                </label>
                <textarea

                  name="description"
                  class="flex min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm "
                />
              </div>
              <div>
                <label class="text-sm font-semibold leading-none">Price</label>
                <input
                  required
                  name="price"
                  type="number"
                  step="0.1"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm "
                />
              </div>
              <div>
                <label class="text-sm font-semibold leading-none">
                  Category
                </label>
                <div
                  hx-get="/api/categories"
                  hx-swap="innerHTML"
                  hx-trigger="load, refreshOptions from:body"
                  hx-target="#options"
                >
                  <div id="options" />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/80 h-10 px-4 py-2 w-full"
                >
                  <div class="flex flex-row items-center justify-center gap-2">
                    {CirclePlus}
                    Add Item
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddNewCategory = () => {
  return (
    <div class="flex-auto">
      <div class="p-6">
        <div class="rounded-lg border bg-white shadow-sm">
          <div class="flex flex-col space-y-1 p-6">
            <h3 class="whitespace-nowrap text-2xl font-bold text-indigo-600 leading-none tracking-tight">
              Add New Category
            </h3>
          </div>
          <div class="p-6">
            <form
              hx-post="/api/categories"
              hx-trigger="submit"
              hx-on--after-request="htmx.trigger(document.body, 'refreshMenuList'); this.reset(); htmx.trigger(document.body, 'refreshOptions');"
              hx-swap="innerHTML"
              hx-target="#toast-container"
              class="space-y-5"
            >
              <div>
                <label class="text-sm font-semibold leading-none">Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm "
                />
              </div>
              <div>
                <label class="text-sm font-semibold leading-none mb-2">Color</label>
                <div class="bg-white p-2 rounded-lg">
                  <div class="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <div class="flex justify-center items-center">
                        <button
                          type="button"
                          name="color"
                          value={color}
                          class={`w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-${color} hover:ring-2 hover:ring-offset-2 hover:ring-${color}`}
                          onclick="this.form.querySelector('input[name=color]').value = this.value; this.closest('.grid').querySelectorAll('button').forEach(btn => btn.classList.remove('ring-2', 'ring-offset-2')); this.classList.add('ring-2', 'ring-offset-2');"
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
                <input type="hidden" name="color" value={colors[0]} />
              </div>
              <div>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/80 h-10 px-4 py-2 w-full"
                >
                  <div class="flex flex-row items-center justify-center gap-2">
                    {CirclePlus}
                    Add Category
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MenuEditor = () => {
  return (
    <div class="container mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"
      style="font-family: 'Raleway', sans-serif;"
    >
      <div class="rounded-lg border bg-white w-full shadow-lg border-t-4 border-blue-500">
        <div class="flex flex-col space-y-1.5 p-6 bg-white rounded-t-lg">
          <h3 class="whitespace-nowrap mx-auto tracking-tight text-3xl font-bold text-blue-700">
            Menu Editor
          </h3>
        </div>
        <div class="flex flex-row justify-between gap-6 p-6 items-stretch">
          <AddNewItem />
          <AddNewCategory />
        </div>
        <div
          hx-get="/api/menulist"
          hx-target="#menu-list"
          hx-swap="innerHTML"
          hx-swap-oob="true"
          hx-boost="true"
          hx-trigger="refreshMenuList from:body"
          class="p-6"
        >
          <div id="menu-list"></div>
        </div>
        <div
          id="toast-container"
          class="fixed bottom-0 right-0 m-4 flex flex-col gap-2"
          aria-live="polite"
        />
      </div>
    </div>
  );
};
