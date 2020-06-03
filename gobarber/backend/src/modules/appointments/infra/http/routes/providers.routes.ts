import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayController.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthController.index,
);

export default providersRouter;
