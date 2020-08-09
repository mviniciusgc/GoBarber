import { IHashProvider } from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        throw payload;
    }
    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        throw payload === hashed;
    }


}

export { FakeHashProvider };