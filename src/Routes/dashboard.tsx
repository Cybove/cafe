import Elysia from 'elysia'
import * as elements from 'typed-html'
import Root from '../Components/root'
import { Dashboard } from '../Components/dashboardComponent'

export const dashboard = (app: Elysia) => {
    return app.get('/dashboard', () =>
        <Root>
            <Dashboard />
        </Root>
    )
}
