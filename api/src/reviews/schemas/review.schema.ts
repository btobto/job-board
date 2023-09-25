import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company } from '../../companies/schemas';
import { Person } from '../../persons/schemas';
import { referenceValidator } from '../../common/validators';
import { UserType } from 'src/common/enums';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  toJSON: {
    transform: (doc, ret, opts) => {
      delete ret.person;
      return ret;
    },
  },
})
export class Review {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserType.Company,
    index: true,
    required: true,
    validate: referenceValidator,
  })
  company: Company | mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserType.Person,
    required: true,
    validate: referenceValidator,
  })
  person: Person | mongoose.Types.ObjectId;

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

ReviewSchema.index({ company: 1, person: 1 }, { unique: true });
