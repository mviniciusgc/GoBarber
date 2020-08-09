import { uuid } from 'uuidv4';
import Appointment from '../../infra/typeorm/entities/Appointment';
import {isEqual} from 'date-fns';

import { IAppointmentsRepository } from '../IAppointmentsRepository';
import { ICreateAppointmentDTO } from '../../../appointments/dtos/ICreateAppointmentDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppoitment = this.appointments.find(
            appointment => isEqual(appointment.date, date)
        );
        return findAppoitment;

    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }

}

export { FakeAppointmentsRepository };