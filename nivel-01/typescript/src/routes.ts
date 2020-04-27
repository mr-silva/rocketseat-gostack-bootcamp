import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Maicon R. Silva',
    email: 'maiconrods@gmail.com',
    password: '123456',
    techs: [
      'Node.js',
      'ReactJS',
      'PHP',
      {
        title: 'JavaScript',
        experience: 40,
      }
    ],
  });

  console.log(user);

  return response.json({ ok: true });
}
