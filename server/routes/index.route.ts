import {RouteController} from '../core/RouteController'
import {Context, Next} from 'koa';
import Router from '@koa/router';

export default class IndexController extends RouteController {
  constructor(router: Router) {
    super(router)
  }

  public init(): void {
    this.router.get('/', this.index.bind(this));
    this.router.get('/users', this.getUsers.bind(this));
    this.router.get('/data', this.getData.bind(this));
    this.router.post('/data', this.setData.bind(this))
  }

  private async index(ctx: Context, next: Next) {
    ctx.body = 'hello, koajs.'
  }

  private async getUsers(ctx: Context, next: Next) {
    ctx.body = await this.db.get('users');
  }

  private async getData(ctx: Context, next: Next) {
    const id = ctx.request.query.id;
    ctx.body = (await this.db.get('users') || {})[id] || {};
  }

  private async setData(ctx: Context, next: Next) {
    const current = await this.db.get('users') || {};
    const body = ctx.request.body;
    const {id, data, version} = body;
    current[id] = {data, version};
    await this.db.set('users', current)
    ctx.body = {
      code: 0,
      msg: '更新成功。'
    }
  }
}