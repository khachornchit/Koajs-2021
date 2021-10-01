let credential = {name: 'admin', pass: 'Test123!'}
import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import '@babel/polyfill'
const mongoose = require('koa-mongoose')

const port = 3670
const app = new Koa()
const router = new KoaRouter()

// Use as middleware
app.use(bodyParser())

// app.use(MongoDB({
//     uri: 'mongodb://administrator:changeme@127.0.0.1:27017/test'
// }))

let init = [
    {id: 1, name: "John"},
    {id: 2, name: "Lisa S."}
]

let data = init

router.get('/', home)
router.get('/list', list)
router.post('/add', add)
router.put('/update', update)
router.delete('/reset', reset)
router.get('/test_mongo', testMongo)

async function home(ctx) {
    ctx.body = `Welcome to Koa`
}

async function list(ctx) {
    ctx.body = data
}

async function add(ctx) {
    let input = ctx.request.body
    data.push(input)
    ctx.body = data
}

async function update(ctx) {
    let input = ctx.request.body
    const index = data.findIndex(e => e.id === input.id)

    if (index === -1) {
        data.push(input)
    } else {
        data[index] = input
    }

    ctx.body = data
}

async function reset(ctx) {
    data = init
    ctx.body = data
}

async function testMongo(ctx) {
    // const result = await ctx.db.collection('users').insert({name: 'haha'})
    // const userId = result.ops[0]._id.toString()
    // ctx.body = await ctx.db.collection('users').find().toArray()
    // ctx.db.collection('users').remove({
    //     _id: mongo.ObjectId(userId)
    // })
    ctx.body = 'hello2'
}

app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
    console.log('App is running')
})
