import Ajv, { SchemaObject } from 'ajv';
import ajvErrors from 'ajv-errors';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../libs/errors';

type EnumObj = ('body' | 'params' | 'query')[];

export function validate(dto: SchemaObject, objects: EnumObj = ['body']) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv /*, {singleError: true} */);

    for (let i = 0, len = objects.length; i < len; i++) {
      const validate = ajv.compile(dto[objects[i]]);
      if (!validate(req[objects[i]])) {
        const validateErrors = validate.errors ?? [];
        const errors: string[] = [];
        for (let i = 0, len = validateErrors.length; i < len; i++) {
          errors.push(res.__(validateErrors[i].message as string));
        }
        next(
          new ErrorHandler({
            message: 'validateError',
            error: errors,
          })
        );
      }
    }

    next();
  };
}
