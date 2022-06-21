import express, { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../error';

/**
 * @method result
 * @description Custom response
 * @param data
 */
express.response.handler = async function (data) {
  const res = _this(this);

  try {
    const result = await data;
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    return handleError(error, res);
  }
};

express.response.success = function (data) {
  const res = _this(this);
  res.status(200).json(data);
};

/**
 * @method error
 * @description Custom response success
 * @param error
 */
express.response.error = function (error: ErrorHandler) {
  const res = _this(this);
  return handleError(error, res);
};

async function handleError(error, res: Response) {
  const status = error.status ?? res.statusCode ?? StatusCodes.BAD_REQUEST;
  if (!(error instanceof ErrorHandler)) {
    error.message = getReasonPhrase(
      status ?? StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const msg =
    (error.response && JSON.parse(error.response.body).error.message) ??
    res.__(error.message) ??
    getReasonPhrase(status);

  return res.status(status).json({
    message: msg,
    stack: error.stack,
    status: status,
    errors: error.error ?? error.errors,
    code: error.code,
  });
}

function _this(val: Response) {
  return val;
}

export default express;
