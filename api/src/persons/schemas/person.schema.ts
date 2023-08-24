import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { Location, LocationSchema } from '../../common/schemas';
import {
  WorkExperience,
  WorkExperienceSchema,
} from '../../common/schemas/work-experience.schema';
import { EducationSchema } from 'src/common/schemas/educaton.schema';
import { Education } from 'src/common/dto/education.dto';

export type PersonDocument = HydratedDocument<Person>;

@Schema({
  collection: 'persons',
  toObject: {
    transform: (doc, ret, options) => {
      delete ret.hashedPassword;
      return ret;
    },
  },
})
export class Person {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop()
  about: string;

  @Prop({ type: LocationSchema, _id: false })
  location: Location;

  @Prop([String])
  skills: string[];

  @Prop({ type: [WorkExperienceSchema], _id: false })
  prevExperience: WorkExperience[];

  @Prop({ type: [EducationSchema], _id: false })
  education: Education[];

  @Prop()
  imagePath: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
