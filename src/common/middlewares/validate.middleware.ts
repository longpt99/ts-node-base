import Ajv, { SchemaObject } from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../libs/errors';

const REQUEST_PARAMS = ['body', 'params', 'query'];
const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
addFormats(ajv);

export function validate(dto: SchemaObject) {
  return (req: Request, res: Response, next: NextFunction): void => {
    let isValidRequest = false;
    for (let i = 0, len = REQUEST_PARAMS.length; i < len; i++) {
      if (!dto[REQUEST_PARAMS[i]]) {
        continue;
      }

      const validate = ajv.compile(dto[REQUEST_PARAMS[i]]);
      if (!validate(req[REQUEST_PARAMS[i]])) {
        const validateErrors = validate.errors ?? [];
        const errors: string[] = [];
        for (let i = 0, len = validateErrors.length; i < len; i++) {
          errors.push(res.__(validateErrors[i].message as string));
        }
        return next(
          new ErrorHandler({ message: 'validateError', error: errors })
        );
      }

      isValidRequest = true;
    }

    if (!isValidRequest) {
      return next(new ErrorHandler({ message: 'validateInvalid' }));
    }

    next();
  };
}
