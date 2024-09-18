import Elysia from 'elysia'
import * as elements from 'typed-html'
import Root from '../Components/root'
import { Menu } from '../Components/menuComponent'
import { Cart } from '../Components/cartComponent'

export const index = (app: Elysia) => {
    return app.get('/', () =>
        <Root>
            <div>
                <Menu />
                <Cart />
            </div>
        </Root>
    )
}
