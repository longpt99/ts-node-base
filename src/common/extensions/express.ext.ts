import express from 'express';
import { ErrorHandler } from '../error';

/**
 * @method success
 * @description Custom response success
 * @param data
 */
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

  res
    .status(error.status || 400)
    .json({ message: error.message, stack: error.stack, status: error.status });
};

function _this(val: express.Response) {
  return val;
}

export default express;
