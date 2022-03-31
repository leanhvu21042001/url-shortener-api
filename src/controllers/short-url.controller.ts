import { Request, Response } from 'express';
import ShortUrl from '@src/models/short-url.module';
import analytics from '@src/models/analytics.model';

export async function createShortUrl(req: Request, res: Response) {
  // destruct data from request body
  const { destination } = req.body;

  // create new link
  const urlCreated = await ShortUrl.create({ destination });

  // return url created
  return res.send(urlCreated);
}

export async function handleRedirect(req: Request, res: Response) {
  // get short id from params
  const { shortId } = req.params;

  // find short on database
  const short = await ShortUrl.findOne({ shortId }).lean();

  // check is short available
  if (!short) {
    return res.sendStatus(404);
  }

  // create an analytics
  analytics.create({ shortId: short._id });

  // redirect to url
  return res.redirect(short.destination);
}

export async function getAnalytics(_req: Request, res: Response) {
  const data = await analytics.find().lean();

  return res.send(data);
}
