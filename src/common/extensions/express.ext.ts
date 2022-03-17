import express, { Response } from 'express';
import { ErrorHandler } from '../error';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

/**
 * @method result
 * @description Custom response
 * @param data
 */
express.response.result = async function (data) {
  const res = _this(this);

  try {
    const result = await data;
    return res.status(200).json(result);
  } catch (error) {
    return handleError(error, res);
  }
};

express.response.success = async function (data) {
  const res = _this(this);
  res.status(200).json(data);
};

/**
 * @method error
 * @description Custom response success
 * @param error
 */
// express.response.error = async function (error: ErrorHandler) {
//   const res = _this(this);
//   console.log('huhkhk');

//   console.log(error);
//   console.log(123);

//   console.log(error.status);

//   let status = error.status ?? StatusCodes.BAD_REQUEST;
//   if (error instanceof ErrorHandler) {
//     console.log(error.stack);
//     status = StatusCodes.INTERNAL_SERVER_ERROR;
//     error.message = getReasonPhrase(status);
//   }

//   res.status(status).json({
//     message: error.message ?? getReasonPhrase(status),
//     stack: error.stack,
//     status: error.status,
//     errors: error.errors,
//   });
// };

async function handleError(error: any, res: Response) {
  console.log('huhkhk');

  console.log(error.response);
  console.log(123);

  console.log(error.status);

  let status = error.status ?? StatusCodes.BAD_REQUEST;
  console.log(123, status, StatusCodes.BAD_REQUEST);

  if (error instanceof ErrorHandler) {
    console.log(error.stack);
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    error.message = getReasonPhrase(status);
  }

  console.log({
    message:
      (error.response &&
        (JSON.parse(error.response.body) as any)?.error?.message) ??
      error.message ??
      getReasonPhrase(status),
    stack: error.stack,
    status: status,
    errors: error.errors,
  });

  return res.status(status).json({
    message:
      (error.response && JSON.parse(error.response.body).error.message) ??
      error.message ??
      getReasonPhrase(status),
    stack: error.stack,
    status: status,
    errors: error.errors,
  });
}

function _this(val: express.Response) {
  return val;
}

export default express;
