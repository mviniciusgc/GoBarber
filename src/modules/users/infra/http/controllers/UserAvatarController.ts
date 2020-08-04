import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarService } from '../../../services/UpdateUserAvatarService';

class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvartar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvartar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json({ user });
    }
}

export { UserAvatarController }