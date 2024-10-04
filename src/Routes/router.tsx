import { Elysia } from "elysia";
import { index } from "./index";
import { dashboard } from "./dashboard";
import { menueditor } from "./menueditor";
import { cart } from "./API/cart";
import { categories } from "./API/category";
import { item } from "./API/item";
import { menulist } from "./API/menulist";
import { orders } from "./API/orders";

export const routes = (app: Elysia) => {
  return app
    .use(index)
    .use(cart)
    .use(dashboard)
    .use(menueditor)
    .use(categories)
    .use(item)
    .use(menulist)
    .use(orders)
};
