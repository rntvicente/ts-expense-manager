export default class InvalidError extends Error {
  constructor(field: string) {
    super(`Invalid Field: ${field}`);
  }
}
