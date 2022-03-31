import { Express, Request, Response } from 'express';
import {
  handleRedirect,
  createShortUrl,
  getAnalytics,
} from '@src/controllers/short-url.controller';
import shortUrlSchema from '@src/schemas/create-short-url.chema';
import validateResource from '@src/middlewares/validate-resourse.middleware';

export default function routes(app: Express) {
  app.get('/healthcheck', (_req: Request, res: Response) => {
    return res.send('App is healthy');
  });

  app.post('/api/url', validateResource(shortUrlSchema), createShortUrl);

  app.get('/:shortId', handleRedirect);

  app.get('/api/analytics', getAnalytics);
}
