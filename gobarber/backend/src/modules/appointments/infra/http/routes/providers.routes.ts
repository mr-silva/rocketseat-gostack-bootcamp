import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailability from '@modules/appointments/infra/http/controllers/ProviderDayAvailability';
import ProviderMonthAvailability from '@modules/appointments/infra/http/controllers/ProviderMonthAvailability';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayController = new ProviderDayAvailability();
const providerMonthController = new ProviderMonthAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthController.index,
);

export default providersRouter;
