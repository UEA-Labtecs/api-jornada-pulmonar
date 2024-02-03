import { Controller } from '@/presentation/contracts';

import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: req.body || null,
      params: req.params || null,
      query: req.query || null,
    };
    const httpResponse = await controller.handle(
      request.params,
      request.body,
      request.query,
    );
    res.status(httpResponse.statusCode).json(httpResponse.data);
  };
};
