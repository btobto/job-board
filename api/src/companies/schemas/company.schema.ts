import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Location, LocationSchema } from '../../common/schemas';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  toObject: {
    transform: (doc, ret, options) => {
      const rating =
        ret.ratingsCount === 0
          ? 0
          : (ret.ratingsSum / ret.ratingsCount).toFixed(2);

      delete ret.ratingsSum;
      return { ...ret, rating };
    },
  },
})
export class Company {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

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
