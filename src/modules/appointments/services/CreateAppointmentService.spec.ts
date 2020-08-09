import "reflect-metadata";
import AppError from '../../../shared/erros/AppError';
import { CreateAppointmentService } from './CreateAppointmentService';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentsRepository';


describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {

        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);

        const appointment = await createAppointmentService.execute({
            date: new Date(),
            provider_id: '1231325',
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1231325');
    })

    it('should not be able to create two appointments on the same time', async () => {

        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository);

        const data = new Date(2020, 4, 10, 11);

        await createAppointmentService.execute({
            date: data,
            provider_id: "1234",
        })


        expect(
            createAppointmentService.execute({
                date: data,
                provider_id: "1234",
            }),
        ).rejects.toBeInstanceOf(AppError);

    })

})