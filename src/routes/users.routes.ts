import { Router, response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../service/updateUserAvatarService';


const usersRouter = Router();
const upload = multer(uploadConfig);

import CreateUserService from '../service/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
/**
 * Repositories
 * 
 */

usersRouter.post('/', async (request, response) => {
    try {

        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    try {
        const updateUserAvartar = new UpdateUserAvatarService();

        const user = await updateUserAvartar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;
        return response.json({ user });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;