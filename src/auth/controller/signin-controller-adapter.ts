import { HttpRequest, HttpResponse } from '../../infra/server/http';

import { SignIn } from '../application/use-cases/signup';
import { Controller } from '../../infra/controller/handle';

export class SignInControllerAdapter implements Controller {
  constructor(private readonly signIn: SignIn) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const userId = await this.signIn.execute(body);

    return { statusCode: 201, body: userId };
  }
}
