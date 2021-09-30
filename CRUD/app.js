let credential = {name: 'admin', pass: 'Test123!'}
import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import '@babel/polyfill'
import mongo from 'koa-mongo'
import auth from 'koa-basic-auth'

const port = 3670
const app = new Koa()
const router = new KoaRouter()

// Use as middleware
app.use(bodyParser())
app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'userList'
}))

let init = [
    {id: 1, name: "John"},
    {id: 2, name: "Lisa S."}
]

let data = init

router.get('/', read)
router.post('/add', add)
router.put('/update', update)
router.delete('/reset', reset)

async function read(ctx) {
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

app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
    console.log('App is running')
})
