import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  website: string;

  @Prop()
  description: string;

  @Prop([
    raw({
      country: { type: String, required: true },
      city: { type: Number, required: true },
      address: { type: Number },
    }),
  ])
  offices: Record<string, any>[];

  @Prop()
  ratingsSum: number;

  @Prop()
  ratingsCount: number;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
