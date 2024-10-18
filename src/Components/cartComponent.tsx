import * as elements from "typed-html";
import { ChevronUp, Minus } from "lucide-static";
import { OrderItem } from "../Types/types";

export const CartItems = ({ items }: { items: OrderItem[] }) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div class="space-y-2">
      {items.map((item) => (
        <div class="flex justify-between items-center p-2 bg-white rounded shadow">
          <button
            class="text-white bg-red-400 rounded-full hover:bg-red-500"
            hx-post="/api/cart/remove"
            hx-vals={`js:{token: document.cookie.split("; ").find(row => row.startsWith("cartToken="))?.split("=")[1] || "", "item_id": ${item.item_id}}`}
            hx-trigger="click"
            hx-target="#cart"
            hx-swap="innerHTML"
          >
            {Minus}
          </button>
          <span class="font-semibold">{item.name}</span>
          <span>{item.price} TL</span>
        </div>
      ))}

      <div
        class="font-bold text-center mt-4"
      >
        Total: <span id="cart-total">{totalPrice} TL</span>
      </div>
    </div>
  )
}

export const Cart = () => {
  return (
    <div class="fixed bottom-4 right-4 w-64">
      <div class="cart-container cart-minimized rounded-sm shadow-lg w-64">
        <div
          class="flex flex-row p-2 bg-purple-500 text-white justify-between items-center cursor-pointer rounded-sm"
          _=" on click 
              remove .animate__animated from me
              remove .animate__bounce from me
              remove .animate__jello from me
              wait for 10ms
              add .animate__animated to me
              get closest .cart-container
              if it matches .cart-minimized
                  add .animate__jello to me
              else
                  add .animate__bounce to me
              end
              toggle .cart-minimized on closest .cart-container
              toggle .rotate-180 on .toggle-icon
              toggle .cart-open on document.body
          "
        >
          <div class="flex flex-row items-center">
            <span class="text-3xl font-semibold mr-2">Cart</span>
            <span class="text-3xl"
              hx-get="/api/cart/token"
              hx-trigger="needToken"
              hx-swap="innerHTML"
              _="
                on load
                set existingToken to cookies.cartToken
                if existingToken
                    set my innerHTML to existingToken
                else
                    trigger needToken
                end
                on htmx:afterSettle
                    if not cookies.cartToken
                        set token to my textContent
                        set document.cookie to `cartToken=${token}; path=/; Max-age=43200; SameSite=Lax`
                    end"
            >
            </span>
          </div>

          <div class="toggle-icon transition-transform duration-300 rotate-180">
            {ChevronUp}
          </div>
        </div>

        <div class="cart-content transition-all duration-500 ease-in-out max-h-52 overflow-auto">
          <div
            id="cart"
            class="px-3 py-2 bg-gray-100 overflow-auto justify-center items-center text-center"
            hx-get="/api/cart"
            hx-trigger="load"
            hx-vals='js:{ token: document.cookie.split("; ").find(row => row.startsWith("cartToken="))?.split("=")[1] || "" }'
            hx-swap="innerHTML"
          >
          </div>
        </div>

      </div>
    </div>
  );
};
