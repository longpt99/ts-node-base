import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { Request, Response } from 'express';

export function validationMiddleware(dto, objects = ['body']) {
  return (req: Request, res: Response, next) => {
    const ajv = new Ajv({ allErrors: true });
    ajvErrors(ajv /*, {singleError: true} */);

    const reqObjectsAccepted = ['body', 'params', 'query'];
    for (const object of objects) {
      if (!reqObjectsAccepted.includes(object)) {
        res.error({});
      }
      const validate = ajv.compile(dto[object]);
      if (!validate(req[object])) {
        return res.status(400).json(validate.errors);
      }
    }
    next();
  };
}
