import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Posting } from '../../postings/schemas/posting.schema';
import { Review } from '../../reviews/schemas/review.schema';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  description: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posting' }] })
  postings: Posting[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
