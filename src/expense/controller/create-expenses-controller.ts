import { HttpRequest, HttpResponse } from '../../infra/server/http';
import { Controller } from '../../infra/controller/handle';

import { CreateExpenses } from '../application/use-case/create-expense';

export class CreateExpensesControllerAdapter implements Controller {
  constructor(private readonly createExpenses: CreateExpenses) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const expensesId = await this.createExpenses.execute(body);

    return { statusCode: 201, body: expensesId };
  }
}
