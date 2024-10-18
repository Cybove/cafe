import { Elysia } from "elysia";
import * as elements from "typed-html";
import { getOrders, getAllOrderItems, completeOrder, deleteOrder } from "../../Database/dbMethods";
import { eventEmitter } from "../../Utils/eventEmitter";
import { X } from "lucide-static";

export const orders = (app: Elysia) => {
    app.get("/api/orders", () => {
        const orders = getOrders();
        const orderItems = getAllOrderItems();
        return (
            <div class="flex flex-wrap justify-start gap-5 p-4">
                {orders.map((order) => (
                    <div class="flex-grow-0 flex-shrink-0 basis-[calc(25%-1.25rem)] min-w-[250px]">
                        <div class="rounded-lg border bg-white text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                            <div class="flex flex-col space-y-2 p-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-t-lg">
                                <div class="whitespace-nowrap text-5xl font-bold leading-none tracking-tight flex items-center">
                                    <div class="flex-grow text-center relative">
                                        {order.customer_token}
                                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2">
                                            <button
                                                class="bg-red-300 p-1 rounded-full hover:bg-red-600 transition-colors"
                                                hx-post="/api/order/delete"
                                                hx-vals={`{ "token": "${order.customer_token}" }`}
                                                hx-swap="outerHTML"
                                                hx-confirm="Are you sure you want to delete this order?"
                                            >
                                                {X}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="p-4 pt-4">
                                <div class="space-y-2">
                                    {orderItems
                                        .filter(item => item.customer_token === order.customer_token)
                                        .map(orderItem => (
                                            <div class="flex justify-between items-center p-3 bg-gray-100 rounded shadow hover:bg-gray-300 transition-colors">
                                                <span class="font-semibold text-gray-800">
                                                    {orderItem.name}
                                                </span>
                                                <span class="text-gray-700">{orderItem.price} TL</span>
                                            </div>
                                        ))}
                                    <div class="text-center mt-4">
                                        <span class="font-semibold text-gray-800">Total:</span>
                                        <span class="text-gray-700 font-semibold">
                                            {orderItems
                                                .filter(item => item.customer_token === order.customer_token)
                                                .reduce((total, item) => total + item.price, 0)} TL
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    });

    app.post("/api/order/complete", ({ body }) => {
        const { token } = body as { token: string; };
        completeOrder(token);
        eventEmitter.emit("cartUpdate", {});
        return;
    });

    app.post("/api/order/delete", ({ body }) => {
        const { token } = body as { token: string; };
        deleteOrder(token);
        eventEmitter.emit("cartUpdate", {});
        return;
    });

    app.ws("/ws", {
        open(ws) {
            ws.send(String.fromCharCode(0));

            const onCartUpdate = () => {
                const message = "";
                ws.send(message);
            };

            eventEmitter.on("cartUpdate", onCartUpdate);

            setInterval(() => {
                ws.send("");
            }, 120000);
        },
    });

    return app;
};
