import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';


interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepositor = getRepository(User);

        const user = await usersRepositor.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar.');
        }

        if (user.avatar) {
            //deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);


            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }

            
        }
        
        
        user.avatar = avatarFilename;

        await usersRepositor.save(user);

        return user;


    }
}

export default UpdateUserAvatarService;