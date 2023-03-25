import { Query, Document } from 'mongoose';

export interface GlobalQueryHelpers {
  leanAndStrip<T>(
    ...additionalProperties: (keyof T)[]
  ): Query<any, Document<T>> & GlobalQueryHelpers;
}
