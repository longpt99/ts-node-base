import express, { Response } from 'express';
import { ErrorHandler } from '../error';
import logger from '../../utils/logger';
import StatusCodes from '../../utils/status-code';

/**
 * @method handler
 * @description Custom response http method
 * @param data
 */
express.response.handler = async function (data) {
  const res = _this(this);
  try {
    const result = await data;
    return res.status(200).json(result);
  } catch (error) {
    return res.error(error ?? {}, res);
  }
};

/**
 * @method success
 * @description Custom response success
 * @param data
 */
express.response.success = function (data) {
  const res = _this(this);
  return res.status(200).json(data);
};

/**
 * @method error
 * @description Custom response error
 * @param error
 */
express.response.error = function (error) {
  const res = _this(this);

  let status =
    error.status ??
    (error.message && StatusCodes.getCode(error.message)) ??
    400;

  if (error.stack) {
    logger.error(error.stack);
  }

  if (!(error instanceof ErrorHandler)) {
    status = 500;
    error.message = StatusCodes.getReasonPhraseCode(status);
  }

  const msg =
    (error.response && JSON.parse(error.response.body).error.message) ??
    (error.message && res.__(error.message)) ??
    StatusCodes.getReasonPhraseCode(status);

  return res.status(status).json({
    message: msg,
    stack: process.env.NODE_ENV !== 'production' && error.stack,
    status: status,
    errors: error.error ?? error.errors,
    code: error.code,
  });
};

function _this(val: Response) {
  return val;
}

export default express;
