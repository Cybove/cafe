import { Elysia } from 'elysia'
import * as elements from 'typed-html'
import { MenuEditor } from '../Components/editorComponent'
import Root from '../Components/root'

export const menueditor = (app: Elysia) => {
    return app.get('/menueditor', () =>
        <Root>
            <MenuEditor />
        </Root>
    )
}
