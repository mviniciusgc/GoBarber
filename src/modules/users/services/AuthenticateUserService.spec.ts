import "reflect-metadata";

import { UsersRepository } from '../repositories/fakes/FakeUserRepository';
import { AuthenticateUserService } from './AuthenticateUserService';
import { CreateUserService } from './CreateUserService';
import { FakeHashProvider } from '../providers/hasProvider/fake/FakeHashProvider';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {

        const fakeHashProvider = new FakeHashProvider();
        const usersRepository = new UsersRepository();
        const authenticateUserService = new AuthenticateUserService(usersRepository,fakeHashProvider);
        const createUserService = new CreateUserService(usersRepository,fakeHashProvider);

        await createUserService.execute({
            email: "teste1@hotmail.com",
            name: "marcos 2",
            password: "123456"
        })

        const response = await authenticateUserService.execute({
            email: "teste1@hotmail.com",
            password: "123456"
        })

        expect(response).toHaveProperty('token');
    })

})