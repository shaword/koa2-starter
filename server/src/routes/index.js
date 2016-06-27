import Router from 'koa-router';
import ApiRouter from './api';
import indexCtrl from '../controllers/index'

export default class AppRouter {

  constructor() {
    this.router = new Router();
    this.onRoutes();
    this.use();
  }

  onRoutes() {
    this.router
      .get('/', indexCtrl);
  }

  use() {
    this.router.use(
      (new ApiRouter()).router.routes()
    );
  }

}

export default () => {
  let appRouter = new AppRouter();
  return appRouter.router;
};
