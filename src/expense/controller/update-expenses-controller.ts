import { HttpRequest, HttpResponse } from '../../infra/server/http';
import { Controller } from '../../infra/controller/handle';

import { UpdateExpenses } from '../application/use-case/update-expenses';

export class UpdateExpensesControllerAdapter implements Controller {
  constructor(private readonly updateExpenses: UpdateExpenses) {}

  async handle({ body, params }: HttpRequest): Promise<HttpResponse> {
    const expensesId = await this.updateExpenses.execute({
      expenseId: params.expenseId,
      document: body
    });

    return { statusCode: 201 };
  }
}
