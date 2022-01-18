import Ajv from 'ajv';
import { Request, Response } from 'express';

export function validationMiddleware(dto) {
  return (req: Request, res: Response, next) => {
    const ajv = new Ajv({ allErrors: true });
    require('ajv-errors')(ajv /*, {singleError: true} */);
    const validate = ajv.compile(dto);
    if (!validate(req.body)) res.status(400).json(validate.errors);
    next();
  };
}
