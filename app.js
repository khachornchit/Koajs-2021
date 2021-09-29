const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new KoaRouter()

// Replace with DB
const things = ['Programming', 'Node.js', 'Koa.js']

// Json Prettier Middleware
app.use(json())

// BodyParser Middleware
app.use(bodyParser())

// Add additional properties to context
app.context.user = "Lisa"

// Simple Middleware
// app.use(async ctx => (ctx.body = {msg: 'Hello World'}))

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

router.get('/', index)
router.get('/add', getAdd)
router.post('/add', postAdd)

async function index(ctx) {
    await ctx.render('index', {
        title: "Things list...",
        things: things
    })
}

async function getAdd(ctx) {
    await ctx.render('showAdd')
}

async function postAdd(ctx) {
    const body = ctx.request.body
    things.push(body.thing)
    ctx.redirect('/')
}

router.get('/hello', ctx => (ctx.body = `Hello ${ctx.user}`))
router.get('/hello/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`))

// Router Middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(5000, console.log('Server started'))
