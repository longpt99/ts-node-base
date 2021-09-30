export class ErrorHandler extends Error {
  status?: number;
  errors?: string[];
  constructor(params: { message: string; status?: number; errors?: string[] }) {
    super();
    this.message = params.message;
    this.status = params.status;
    this.errors = params.errors;
  }
}
