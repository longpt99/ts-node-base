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
    console.log(error.status);

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
express.response.error = async function (error: ErrorHandler) {
  const res = _this(this);
  return handleError(error, res);
};

async function handleError(error: any, res: Response) {
  console.log(error.stack);
  let status = error.status ?? StatusCodes.BAD_REQUEST;
  if (!(error instanceof ErrorHandler)) {
    status = StatusCodes.INTERNAL_SERVER_ERROR;
    error.message = getReasonPhrase(status);
  }

  return res.status(status).json({
    message:
      (error.response && JSON.parse(error.response.body).error.message) ??
      error.message ??
      getReasonPhrase(status),
    stack: error.stack,
    status: status,
    errors: error.error ?? error.errors,
    code: error.code,
  });
}

function _this(val: express.Response) {
  return val;
}

export default express;
