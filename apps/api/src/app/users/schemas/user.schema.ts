import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop(
    raw({
      country: { type: String, required: true },
      city: { type: String, required: true },
    })
  )
  location: Record<string, any>;

  @Prop([String])
  skills: string[];

  @Prop([
    raw({
      companyName: { type: String, required: true },
      yearFrom: { type: Number, required: true },
      yearTo: { type: Number },
    }),
  ])
  prevExperience: Record<string, any>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
