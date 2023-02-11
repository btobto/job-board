import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, LocationSchema } from '../../utils/schemas/location.schema';
import {
  WorkExperience,
  WorkExperienceSchema,
} from '../../utils/schemas/work-experience.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ type: LocationSchema, _id: false })
  location: Location;

  @Prop([String])
  skills: string[];

  @Prop({ type: [WorkExperienceSchema], _id: false })
  prevExperience: WorkExperience[];
}

export const UserSchema = SchemaFactory.createForClass(User);
