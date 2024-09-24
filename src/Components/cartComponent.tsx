import * as elements from 'typed-html';
import { ChevronUp } from 'lucide-static';

export const Cart = () => {
    return (
        <div class="fixed bottom-4 right-4 w-64">
            <div class="cart-container cart-minimized rounded-sm shadow-lg overflow-scroll w-64">
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
                        <div
                            hx-get="/api/cart/identity"
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
                                    set document.cookie to `cartToken=${token}; path=/; max-age=60; SameSite=Lax`
                                end"
                        ></div>

                    </div>

                    <div class="toggle-icon transition-transform duration-300 rotate-180">
                        {ChevronUp}
                    </div>
                </div>

                <div class="cart-content transition-all duration-500 ease-in-out max-h-52 overflow-scroll">
                    <div id="cart" class="px-3 py-2 bg-gray-100 overflow-auto justify-center items-center text-center">
                        <div hx-get="/api/cart/content" hx-trigger="load" hx-swap="innerHTML">
                            <div id="cart-items"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
