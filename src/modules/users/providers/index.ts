import { container } from 'tsyringe';

import { IHashProvider } from './hasProvider/models/IHashProvider';
import { BCryptHashProvider } from './hasProvider/implementations/BCryptHashProvider';

container.register<IHashProvider>('HashProvider', BCryptHashProvider);