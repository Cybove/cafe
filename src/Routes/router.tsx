import { Elysia } from 'elysia'
import { index } from './index'
import { cart } from './cart'

export const routes = (app: Elysia) => {
    return app
        .use(index)
        .use(cart)
}
