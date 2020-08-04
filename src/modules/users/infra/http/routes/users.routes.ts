import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import { UsersCrontroller } from '../controllers/UsersController';
import { UserAvatarController } from '../controllers/UserAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);
const usersCrontroller = new UsersCrontroller()
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersCrontroller.create)

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;