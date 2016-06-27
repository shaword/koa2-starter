export default {

  user: async(ctx, next) => {
    ctx.body = 'userrrr'
  },

  post: async(ctx, next) => {
    ctx.body = {
      code: 1,
      data: {
        id: '1111',
        cnt: 'fsdcvrvfe'
      }
    }
  }

}
