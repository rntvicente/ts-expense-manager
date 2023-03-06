export class MissingParamError extends Error {
  constructor(field: string | string[]) {
    super(`Missing Param: ${field}`);
  }
}
