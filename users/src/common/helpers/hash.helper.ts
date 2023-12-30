import * as bcryptjs from 'bcryptjs';

export class HashHelper {
  static async getHash(val: string): Promise<string> {
    return bcryptjs.hashSync(val, 12);
  }
}
