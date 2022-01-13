import { Request, Response } from 'express';
import { DateTimeUtil } from '../../utils';

export function responseTimeMiddleware(req: Request, res: Response, next): any {
  res.on('finish', () => {
    const durationInMilliseconds = DateTimeUtil.getDurationInMilliseconds(
      process.hrtime()
    );
    console.log(
      `${req.method} ${
        req.originalUrl
      }: ${durationInMilliseconds.toLocaleString()} ms`
    );
  });
  next();
}
