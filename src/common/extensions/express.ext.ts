import express from 'express';
import { ErrorHandler } from '../error';

/**
 * @method result
 * @description Custom response
 * @param data
 */
express.response.result = async function (data) {
  const res = _this(this);
  try {
    const result = await data;
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 400).json({
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
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
  console.log(error);

  res.status(error.status || 400).json({
    message: error.message,
    stack: error.stack,
    status: error.status,
    errors: error.errors,
  });
};

function _this(val: express.Response) {
  return val;
}

export default express;
