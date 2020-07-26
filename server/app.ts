import Koa from "koa";
import cors from "@koa/cors";
import { createRootContainer } from "what-di";
import initRouter from "./routes";
import DBUtils from "./utils/db.utils";
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import {resolve} from "path";
import compress from 'koa-compress'

createRootContainer({
  providers: [{ provide: "db", useValue: new DBUtils() }],
});

const app = new Koa();
app.use(compress())
app.use(cors());
app.use(bodyParser())
app.use(koaStatic(resolve(__dirname, '../dist')));

initRouter(app);

app.listen(3030, () => {
  console.log("app is running at: http://localhost:3030");
});
