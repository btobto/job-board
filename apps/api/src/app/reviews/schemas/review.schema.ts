import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../companies/schemas/company.schema';
import { User } from '../../users/schemas/user.schema';
import { referenceValidator } from '../../utils/mongoose-validators/referenceValidator';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    index: true,
    required: true,
    validate: referenceValidator,
  })
  company: Company | mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: referenceValidator,
  })
  user: User | mongoose.Types.ObjectId;

  @Prop({ min: 1, max: 5, required: true })
  rating: number;

  @Prop()
  description: string;

  @Prop({ default: Date.now, immutable: true })
  datePosted: Date;

  @Prop()
  dateUpdated: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ company: 1, user: 1 }, { unique: true });
