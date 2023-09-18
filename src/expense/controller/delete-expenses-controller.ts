import { HttpRequest, HttpResponse } from '../../infra/server/http';
import { Controller } from '../../infra/controller/handle';

import { DeleteExpense } from '../application/use-case/delete-expense';

export class DeleteExpensesControllerAdapter implements Controller {
  constructor(private readonly updateExpenses: DeleteExpense) {}

  async handle({ params }: HttpRequest): Promise<HttpResponse> {
    await this.updateExpenses.execute();
    return { statusCode: 202 };
  }
}
