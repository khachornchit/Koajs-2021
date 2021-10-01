let credential = {name: 'admin', pass: 'Test123!'}
import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import '@babel/polyfill'
const mongoose = require('koa-mongoose')
import {home, list, add, update, reset} from "./Api";

const port = 3001
const app = new Koa()
const router = new KoaRouter()

app.use(bodyParser())
// app.use(mongo({
//     uri: 'mongodb://administrator:changeme@localhost:27017/test?authSource=admin', //or url
//     max: 100,
//     min: 1
// }))

// app.use(MongoDB({
//     uri: 'mongodb://administrator:changeme@127.0.0.1:27017/test'
// }))

router.get('/', home)
router.get('/list', list)
router.post('/add', add)
router.put('/update', update)
router.delete('/reset', reset)

app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
    console.log('App is running')
})
