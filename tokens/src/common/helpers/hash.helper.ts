import * as crypto from 'crypto';

export class HashHelper {
  static async getCryptoHash(key: string): Promise<string> {
    const secret = 'crypto-token-secret';
    return crypto.createHmac('sha256', secret).update(key).digest('hex');
  }
}
