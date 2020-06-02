import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailability from '@modules/appointments/infra/http/controllers/ProviderDayAvailability';
import ProviderMonthAvailability from '@modules/appointments/infra/http/controllers/ProviderMonthAvailability';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const providersController = new ProvidersController();
const providerDayController = new ProviderDayAvailability();
const providerMonthController = new ProviderMonthAvailability();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', providersController.index);
appointmentsRouter.get(
  '/:provider_id/day-availability',
  providerDayController.index,
);
appointmentsRouter.get(
  '/:provider_id/month-availability',
  providerMonthController.index,
);

export default appointmentsRouter;
