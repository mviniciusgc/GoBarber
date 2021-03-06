import { container } from 'tsyringe';
import  '../../modules/users/providers';
import { IAppointmentsRepository } from '../../modules/appointments/repositories/IAppointmentsRepository';
import { AppointmentsRepository } from '../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UserRepository';



container.register<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.register<IUsersRepository>('UsersRepository', UsersRepository);





