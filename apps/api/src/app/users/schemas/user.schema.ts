import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, LocationSchema } from '../../utils/location.schema';
import {
  WorkExperience,
  WorkExperienceSchema,
} from '../../utils/workExperience.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: LocationSchema })
  location: Location;

  @Prop([String])
  skills: string[];

  @Prop({ type: [WorkExperienceSchema] })
  prevExperience: WorkExperience[];
}

export const UserSchema = SchemaFactory.createForClass(User);
