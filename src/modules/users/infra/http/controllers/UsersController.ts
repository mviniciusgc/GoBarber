import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../../../services/CreateUserService';

class UsersCrontroller {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
export { UsersCrontroller };