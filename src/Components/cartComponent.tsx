import { ShoppingCart, ChevronUp } from 'lucide-static'

export const Cart = (): string => {
    return /*html*/ `
        <div class="fixed bottom-4 right-4 w-64">
            <div class="cart-container cart-minimized rounded-sm shadow-lg overflow-scroll w-64">
                <div class="flex flex-row p-2 bg-purple-500 text-white justify-between items-center cursor-pointer rounded-sm" 
                _="on click 
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
                    toggle .cart-open on document.body"

                    ">
                    <div class="flex flex-row items-center">
                        ${ShoppingCart}
                        <span class="text-3xl font-semibold ml-2">Cart</span>
                    </div>
                    <div class="toggle-icon transition-transform duration-300 rotate-180">
                        ${ChevronUp}
                    </div>
                </div>
                <div class="cart-content transition-all duration-500 ease-in-out max-h-52 overflow-scroll">
                    <div id="cart" class="px-3 py-2 bg-gray-100 overflow-auto justify-center items-center text-center">
                        <div hx-get="/cart" hx-trigger="load" hx-swap="innerHTML">
                            <div id="cart-items"></div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .cart-minimized .cart-content {
                    max-height: 0;
                }
                body {
                    transition: padding-bottom 0.3s ease-in-out;
                }
                body.cart-open {
                    padding-bottom: 320px;
                }
            </style>
        </div>
    `;
};
