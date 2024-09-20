import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { Minus } from 'lucide-static'

export const cart = (app: Elysia) => {
    return app.get('/api/cart', () =>
        <div class="flex flex-col max-w-2xl mx-auto">
            <div id="cart-items" class="space-y-2 overflow-x-visible">
            </div>
            <div class="text-xl font-bold mt-1">Total: <span id="cart-total">0</span> TL</div>
            <script>
                {/*html*/`
                function updateCart() {
                    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                    const now = Date.now();
                    cartItems = cartItems.filter(item => item.expiration > now);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));

                    const cartItemsContainer = document.getElementById('cart-items');
                    const cartTotal = document.getElementById('cart-total');
                    let total = 0;

                    cartItemsContainer.innerHTML = '';

                    cartItems.forEach((item, index) => {
                        const price = parseFloat(item.price) || 0;

                        const itemElement = document.createElement('div');
                        itemElement.className = 'flex justify-between items-center border-b-2 py-4';
                        itemElement.innerHTML = \`
                            <button class="text-white bg-red-400 rounded-full hover:bg-red-500" onclick="removeItem(\${index})">${Minus}</button>
                            <span class="text-lg">\${item.name}</span>
                            <span class="font-bold">\${price.toFixed(2)} TL</span>
                        \`;
                        cartItemsContainer.appendChild(itemElement);
                        total += price;
                    });

                    cartTotal.textContent = total.toFixed(2);
                }

                function removeItem(index) {
                    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCart();
                }

                updateCart();
                `}
            </script>
        </div>
    )
}
