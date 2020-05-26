import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();
const profielController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profielController.update);

export default profileRouter;
