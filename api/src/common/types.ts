import { Model } from 'mongoose';
import { GlobalQueryHelpers } from './plugins';

export type ModelType<T> = Model<T, GlobalQueryHelpers>;
