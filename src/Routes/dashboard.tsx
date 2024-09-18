import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { Dashboard } from '../Components/dashboardComponent'
import Root from '../Components/root'

export const dashboard = (app: Elysia) => {
    return app.get('/dashboard', () =>
        <Root>
            <Dashboard />
        </Root>
    )
}
