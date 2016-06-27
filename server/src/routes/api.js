import Router from 'koa-router';
import api from '../controllers/api';

export default class ApiRouter {

  constructor() {
    this.router = new Router({
      prefix: '/api'
    });
    this.onRoutes();
  }

  onRoutes() {

    this.router
      .post('/:name', async(ctx, next) => {
        return api[ctx.params.name](ctx, next);
      });

  }

}
