import { RouteController } from '../core/RouteController'
import { Context, Next } from 'koa';
import Router from '@koa/router';

export default class IndexController extends RouteController {
  constructor(router: Router) {
    super(router)
  }
  public init(): void {
    // this.router.get('/', this.index.bind(this));
    this.router.get('/users', this.getUsers.bind(this))
  }
  private async index(ctx: Context, next: Next) {
    ctx.body = 'hello, koajs.'
  }
  private async getUsers(ctx: Context, next: Next) {
    ctx.body = await this.db.get('users');
  }
}