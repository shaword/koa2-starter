import path from 'path'
import Koa from 'koa'
import koaOnError from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import json from 'koa-json'
import logger from 'koa-logger'
import koaStatic from 'koa-static'
import views from 'koa-views';
import routes from './routes';
import config from './config';

const app = new Koa()

// middlewares
app.use(bodyParser())
app.use(json())
app.use(logger())
app.use(cors())

// static
app.use(koaStatic(path.join(__dirname, '../client/dist/')));

// views
app.use(views(path.join(__dirname, './views'), {
  extension: 'hbs',
  map: {
    hbs: 'handlebars'
  }
}));

// 500
koaOnError(app, {
  template: path.join(__dirname, './views/500.hbs')
})

// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// router
let router = routes();
app
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true
  }));

// 404
app.use(async(ctx) => {
  ctx.status = 404
  await ctx.render(404)
})

// error logger
app.on('error', async(err, ctx) => {
  console.log('error occured:', err)
})

const port = config.port || 3000
app.listen(port, () => console.log(`server started ${port}`))

export default app
