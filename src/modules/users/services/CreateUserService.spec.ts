import "reflect-metadata";
import AppError from '../../../shared/erros/AppError';
import { UsersRepository } from '../repositories/fakes/FakeUserRepository';
import { CreateUserService } from './CreateUserService';
import { FakeHashProvider } from '../providers/hasProvider/fake/FakeHashProvider';
import User from "../infra/typeorm/entities/User";

describe('CreateUserService', () => {

    it('should be able to create a new User', async () => {

        const usersRepository = new UsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(usersRepository, fakeHashProvider);

        const user = await createUserService.execute({
            email: "teste1@hotmail.com",
            name: "marcos 1",
            password: "123456"
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('teste1@hotmail.com');


    });

    it('should not be able to create a new user from two e-mail equals', async () => {

        const user = new User();
        const fakeHashProvider = new FakeHashProvider();
        const usersRepository = new UsersRepository();
        const createUserService = new CreateUserService(usersRepository, fakeHashProvider);

        await createUserService.execute({
            email: "teste1@hotmail.com",
            name: "marcos 2",
            password: "12345"
        })

        expect(
            createUserService.execute({
                email: "teste1@hotmail.com",
                name: "marcos 1",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(AppError);

    })


})
