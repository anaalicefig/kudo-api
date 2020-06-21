import IHashProvider from '../models/IHashProvider'
import { hash, compare } from 'bcryptjs'

export default class BCryptHashProvicer implements IHashProvider {
  public async genereteHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
