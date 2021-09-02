export class ErrorHandler extends Error {
  status?: number;
  constructor(params: { message: string; status?: number }) {
    super();
    this.message = params.message;
    this.status = params.status;
  }
}
