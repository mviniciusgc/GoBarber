import Appointment from '../infra/typeorm/entities/Appointment';
import { inject, injectable } from 'tsyringe';
import { startOfHour } from 'date-fns';
import AppError from '../../../shared/erros/AppError';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });
        console.log('valor appointment ' + appointment.id);

        return appointment;
    }
}

export { CreateAppointmentService };