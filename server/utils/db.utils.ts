import fs from 'fs-extra';
import path from 'path'

const dbPath = path.resolve(__dirname, '../../db/db.json');



export default class DbUtil {

  constructor () {
    const base = path.resolve(__dirname, '../../db')
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base)
    }
  }

  public async set (key: string, value: any): Promise<void> {
    const db = await this.readJson();
    db[key] = value;
    await this.writeJson(db);
  }

  public async get(key: string) {
    const db = await this.readJson();
    return db[key];
  }

  public async getDb (): Promise<any> {
    return await this.readJson() as any;
  }

  public async writeJson(db: any) {
    await fs.writeJson(dbPath, db, {spaces: 2})
  }

  async readJson(): Promise<any> {
    try {
      return (await fs.readJson(dbPath) || {});
    } catch (error) {
      await fs.writeJson(dbPath, {}, {spaces: 2});
      return {};
    }
  }

}
