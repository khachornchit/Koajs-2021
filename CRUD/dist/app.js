"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 3670;
const app = new _koa.default();
const router = new _koaRouter.default();
app.use((0, _koaBodyparser.default)());
let data = [{
  id: 1,
  name: "John"
}, {
  id: 2,
  name: "Lisa"
}];
router.get('/', read);
router.post('/add', add);
router.post('/update', update);

async function read(ctx) {
  ctx.body = data;
}

async function add(ctx) {
  let input = ctx.request.body;
  data.push(input);
  ctx.body = data;
}

async function update(ctx) {
  let input = ctx.request.body;
  const index = data.findIndex(e => e.id === input.id);

  if (index === -1) {
    data.push(input);
  } else {
    data[index] = input;
  }

  return input;
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => {
  console.log('App is running');
});