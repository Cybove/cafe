import { Elysia } from 'elysia'
import { index } from './index'
import { cart } from './API/cart'
import { dashboard} from './dashboard'
import { categories } from './API/category'
import { item } from './API/item'
import { menulist} from './API/menulist'

export const routes = (app: Elysia) => {
    return app
        .use(index)
        .use(cart)
        .use(dashboard)
        .use(categories)
        .use(item)
        .use(menulist)
}
