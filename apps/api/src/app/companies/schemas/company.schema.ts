import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, LocationSchema } from '../../utils/schemas/location.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop()
  website: string;

  @Prop()
  description: string;

  @Prop({ type: [LocationSchema], _id: false })
  offices: Location[];

  @Prop({ default: 0 })
  ratingsSum: number;

  @Prop({ default: 0 })
  ratingsCount: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
