import { HttpRequest, HttpResponse } from '../../infra/server/http';

import { Login } from '../application/use-cases/login';
import { Controller } from '../../infra/controller/handle';

export class LoginInControllerAdapter implements Controller {
  constructor(private readonly login: Login) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { email, password } = body;
    const token = await this.login.execute(email, password);

    return { statusCode: 200, body: token };
  }
}
