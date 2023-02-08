import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop([String])
  skills: string[];

  @Prop([
    raw({
      companyName: { type: String },
      dateFrom: { type: Date },
      dateTo: { type: Date },
    }),
  ])
  prevExperience: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
