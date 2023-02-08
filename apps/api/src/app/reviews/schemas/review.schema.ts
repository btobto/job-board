import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';
import { User } from '../../users/schemas/user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true })
  company: Company;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ min: 1, max: 5 })
  rating: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  datePosted: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
