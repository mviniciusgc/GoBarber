import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/erros/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import { IHashProvider } from '../providers/hasProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }
        console.log('Foi até antes de gerar a hash');

        const hashedPassword = await this.hashProvider.generateHash(password);
        console.log('passou da geração da hash');

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}

export { CreateUserService };