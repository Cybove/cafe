import { Elysia } from "elysia";
import * as elements from "typed-html";
import { getOrders, getAllOrderItems} from "../../Database/dbMethods";

export const orders = (app: Elysia) => {
    app.get("/api/orders", () => {
        const orders = getOrders();
        const orderItems = getAllOrderItems();
        return (
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
                {orders.map((order) => (
                    <div class="rounded-lg border bg-white text-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div class="flex flex-col space-y-2 p-6 bg-gray-800 text-white">
                            <div class="whitespace-nowrap text-3xl font-bold leading-none tracking-tight flex justify-between items-center text-center">
                                {order.customer_token}
                            </div>
                        </div>

                        <div class="p-6 pt-4">
                            <div class="space-y-2">
                                {orderItems.filter(item => item.customer_token === order.customer_token).map((orderItem) => (<div class="flex justify-between items-center p-3 bg-gray-100 rounded shadow hover:bg-gray-300 transition">
                                    <span class="font-semibold text-gray-800">{orderItem.name}</span>
                                    <span class="text-gray-700">{orderItem.price} TL</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        )
    });

    return app;
}
