import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { routes } from "./Routes/router";
import { startDatabaseCleaning } from "./Database/dbMethods";
import { basicAuth } from '@eelkevdbos/elysia-basic-auth';

process.env["BASIC_AUTH_CREDENTIALS"] = "admin:admin;user:user";

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .use(basicAuth({
    scope: '/admin'
  }))
  .use(routes)
  .listen(3000);

startDatabaseCleaning();

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
