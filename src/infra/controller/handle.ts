import { HttpRequest, HttpResponse } from '../server/http';

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
