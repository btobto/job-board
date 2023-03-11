import mongoose from 'mongoose';

export function isReferenceValid(
  model: string,
  id: string | mongoose.Types.ObjectId
): boolean {
  return true;
}
