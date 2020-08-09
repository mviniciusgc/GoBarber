import User from '../../infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import AppError from 'shared/erros/AppError';


class UsersRepository implements IUsersRepository {

    private Users: User[] = []

    public async findById(id: string): Promise<User | undefined> {
        return undefined;
    }

    public async findByEmail(email: string): Promise<User | undefined> {

        const user = this.Users.find(user => user.email === email);
        return user;
    }


    public async create(userData: ICreateUserDTO): Promise<User> {

        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.Users.push(user);

        return user;

    }

    public async save(user: User): Promise<User> {

        const findIndex = this.Users.findIndex(findUser => findUser.id === user.id);

        this.Users[findIndex] = user;

        return user;
    }

}

export { UsersRepository };