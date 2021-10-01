import {init, data} from "../Data";

export async function home(ctx) {
    ctx.body = `Koa Error Handling`
}

export async function list(ctx) {
    ctx.body = data
}

export async function add(ctx) {
    let input = ctx.request.body
    data.push(input)
    ctx.body = data
}

export async function update(ctx) {
    let input = ctx.request.body
    const index = data.findIndex(e => e.id === input.id)

    if (index === -1) {
        data.push(input)
    } else {
        data[index] = input
    }

    ctx.body = data
}

export async function reset(ctx) {
    data = init
    ctx.body = data
}

export async function findNotFound(ctx) {
    ctx.body = {message: 'Find not found!'}
}
