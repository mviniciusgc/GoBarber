import { sign } from 'jsonwebtoken';
import User from '../infra/typeorm/entities/User';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/erros/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/hasProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('HashProvider')
        private hashProvider : IHashProvider,
    ) { }


    public async execute({ email, password }: IRequest): Promise<Response> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }
        const { secret, expiresIn } = authConfig.JWT

        const token = sign({}, secret,
            {
                subject: user.id,
                expiresIn,
            });

        return {
            user,
            token,
        };

    }
}

export { AuthenticateUserService };