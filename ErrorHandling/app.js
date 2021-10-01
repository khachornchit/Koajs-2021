import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import '@babel/polyfill'
import {home, list, add, update, reset, findNotFound} from "./Api";
import errorHandler from 'koa-better-error-handler'
import koa404Handler from 'koa-404-handler'

const port = 3670
const app = new Koa()
const router = new KoaRouter()

app.use(bodyParser())
app.context.onerror = errorHandler(); // override koa's undocumented error handler
app.context.api = true; // specify that this is our api
app.use(koa404Handler); // use koa-404-handler

// Router
router.get('/', home)
router.get('/list', list)
router.post('/add', add)
router.put('/update', update)
router.delete('/reset', reset)

// throw an error anywhere you want!
router.get('/404', ctx => ctx.throw(404));
router.get('/500', ctx => ctx.throw(500));

app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
    console.log('App is running')
})
