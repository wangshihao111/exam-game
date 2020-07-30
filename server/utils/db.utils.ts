import fs from 'fs-extra';
import path from 'path'

const dbPath = path.resolve(__dirname, '../../db/db.json');

export default class DbUtil {
  private db: any;

  constructor () {
    const base = path.resolve(__dirname, '../../db')
    if (!fs.existsSync(base)) {
      fs.mkdirSync(base)
    }
    this.db = {};
    this.loadDb();
    setInterval(async () => {
      await this.write();
    }, 3000);
  }

  public set (key: string, value: any): void {
    this.db[key] = value;
  }

  public get(key: string) {
    return this.db[key];
  }

  public getDb () {
    return this.db;
  }

  public async writeJson(db: any) {
    await fs.writeJson(dbPath, db, {spaces: 2})
  }

  private async write() {
    await fs.writeJson(dbPath, this.db, {spaces: 2})
  }

  private loadDb() {
    try {
      this.db = fs.readJSONSync(dbPath);
    } catch (e) {
      fs.writeJsonSync(dbPath, {});
      this.db = {};
    }
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
