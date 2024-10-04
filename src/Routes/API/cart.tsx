import { Elysia } from "elysia";
import * as elements from "typed-html";
import { getOrder, getOrderItems, insertOrder, insertOrderItem, updateOrder, updateOrderItem, deleteOrder, deleteOrderItem } from "../../Database/dbMethods";
import { Order, OrderItem } from "../../Types/types";
import { CartItems } from "../../Components/cartComponent";
import generateToken from "../../Utils/tokenGenerator";

export const cart = (app: Elysia) => {
  app.get("/api/cart", ({ query }) => {
    const token = query.token as string;
    if (!token) {
      return new Response("No token provided", { status: 400 });
    }
    const order = getOrder(token);
    if (!order) {
      const newOrder: Order = {
        customer_token: token,
        created_at: new Date().toISOString(),
        status: false,
      };
      insertOrder(newOrder);
    }
    const orderItems = getOrderItems(token);
    return <CartItems items={orderItems} />;
  });

  app.get("/api/cart/token", () => {
    const animalToken = generateToken();
    if (animalToken === null) {
      console.log("No tokens available.");
      return new Response(null, { status: 204 });
    }
    return <span class="text-3xl">{animalToken}</span>;
  });

  app.post(
    "/api/cart/add",
    ({ body }: { body: { token: string; item_id: number; price: number } }) => {
      if (!body.token) {
        return new Response(
          `<script>window.location.reload();</script>`
        );
      }
      let order = getOrder(body.token);
      if (!order) {
        order = {
          customer_token: body.token,
          created_at: new Date().toISOString(),
          status: false,
        };
        insertOrder(order);
      }
      const orderItem: OrderItem = {
        customer_token: body.token,
        item_id: body.item_id,
        price: body.price,
      };
      insertOrderItem(orderItem);
      const updatedItems = getOrderItems(body.token);
      return <CartItems items={updatedItems} />;
    }
  );

  app.post(
    "/api/cart/remove",
    ({ body }: { body: { token: string; item_id: number } }) => {
      if (!body.token) {
        return new Response(
          `<script>window.location.reload();</script>`
        );
      }
      deleteOrderItem(body.token, body.item_id);
      const updatedItems = getOrderItems(body.token);
      return <CartItems items={updatedItems} />;
    }
  );

  return app;
};
