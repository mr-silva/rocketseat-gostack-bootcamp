import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgorPasswordService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendFogotPasswordEmail = container.resolve(SendForgorPasswordService);

    await sendFogotPasswordEmail.execute({
      email,
    });

    return response.status(204);
  }
}
