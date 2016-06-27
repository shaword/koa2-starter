export default async(ctx, next) => {

  const title = 'koa 2'

  await ctx.render('index', { title })
}
