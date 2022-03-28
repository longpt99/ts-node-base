export class ErrorHandler extends Error {
  private status?: number;
  private code?: string;
  private errors?: any;
  constructor(params: {
    message: string;
    status?: number;
    errors?: any;
    code?: string;
  }) {
    super();
    this.message = params.message;
    this.status = params.status;
    this.errors = params.errors;
    this.code = params.code;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}
