import { Document, Model, Query } from 'mongoose';
import { GlobalQueryHelpers } from './global-query-helpers.interface';

export function leanAndStripQueryPlugin(schema, options) {
  schema.query.leanAndStrip = function <T>(
    ...additionalProperties: (keyof T)[]
  ): Query<any, Document<T>> & GlobalQueryHelpers {
    return this.lean({
      transform: (doc: any) => {
        if (doc._id) doc.id = doc._id.toHexString();
        delete doc._id;
        delete doc.__v;

        for (const key of additionalProperties) {
          delete doc[key];
        }

        return doc;
      },
    });
  };
}
