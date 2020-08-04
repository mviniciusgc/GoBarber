import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import { CreateAppointmentService } from '../../../services/CreateAppointmentService';

class AppointmentController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

        return response.json(appointment);
    }
}

export { AppointmentController };