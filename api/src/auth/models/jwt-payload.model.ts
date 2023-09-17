import mongoose from 'mongoose';
import { USER_TYPE_KEY } from 'src/common/constants';
import { UserType } from 'src/common/enums';

export interface JwtPayload {
  email: string;
  sub: string | mongoose.Types.ObjectId;
  [USER_TYPE_KEY]: UserType;
}
