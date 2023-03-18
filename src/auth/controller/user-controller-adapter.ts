import { HttpRequest, HttpResponse } from '../../infra/server/http';

import { CreateUser } from '../../auth/application/use-cases/signup';
import { Controller } from '../../infra/controller/handle';

export class UserControllerAdapter implements Controller {
  constructor(private readonly createUser: CreateUser) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const userId = await this.createUser.execute(body);

    return { statusCode: 201, body: userId };
  }
}
