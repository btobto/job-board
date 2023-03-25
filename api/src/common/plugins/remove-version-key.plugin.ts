import { Document, Schema } from 'mongoose';

export function stripObjectPlugin<T>(schema: Schema<T>, options) {
  schema.set('toObject', {
    transform: (doc: Document<T>, ret: any, options: any) => {
      return stripObject(doc, ret);
    },
  });
}

export function stripObject<T>(doc: Document<T>, ret: any) {
  ret.id = doc.id;
  delete ret._id;
  delete ret.__v;
  return ret;
}
