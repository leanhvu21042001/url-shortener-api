import mongoose, { Document } from 'mongoose';
import { ShortURL } from './short-url.module';

export interface Analytics extends Document {
  shortUrl: ShortURL;
}

const schema = new mongoose.Schema(
  {
    shortId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'shortUrl',
      required: true,
    },
  },
  { timestamps: true }
);

const analytics = mongoose.model<Analytics>('analytics', schema);

export default analytics;
