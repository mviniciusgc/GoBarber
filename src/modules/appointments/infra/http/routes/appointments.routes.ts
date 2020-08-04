import { Router } from "express";

import ensureAuthenticated from '../../../../users/infra/middlewares/ensureAuthenticated';
import { AppointmentController } from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;