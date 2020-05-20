import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';
import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const createSession = new CreateSessionService(usersRepository);

  const { user, token } = await createSession.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
