import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const providersController = new ProvidersController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', providersController.index);

export default appointmentsRouter;
