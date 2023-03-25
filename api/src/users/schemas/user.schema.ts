import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, LocationSchema } from '../../common/schemas';
import {
  WorkExperience,
  WorkExperienceSchema,
} from '../../common/schemas/work-experience.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  // toObject: {
  //   transform: (doc, ret, options) => {
  //     delete ret.hashedPassword;
  //     return ret;
  //   },
  // },
})
export class User {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ type: LocationSchema, _id: false })
  location: Location;

  @Prop([String])
  skills: string[];

  @Prop({ type: [WorkExperienceSchema], _id: false })
  prevExperience: WorkExperience[];
}

export const UserSchema = SchemaFactory.createForClass(User);
