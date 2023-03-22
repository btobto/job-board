import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';
import { User } from '../../users/schemas/user.schema';
import { Location, LocationSchema } from '../../utils/schemas/location.schema';

export type PostingDocument = HydratedDocument<Posting>;

@Schema()
export class Posting {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    index: true,
    required: true,
  })
  company: Company | mongoose.Types.ObjectId;

  @Prop({ type: LocationSchema })
  location: Location;

  @Prop({ required: true })
  position: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now, immutable: true })
  datePosted: Date;

  @Prop()
  dateUpdated: Date;

  @Prop()
  remote: boolean;

  @Prop()
  salary: string;

  @Prop([String])
  requirements: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  applicants: User[] | mongoose.Types.ObjectId[];
}

export const PostingSchema = SchemaFactory.createForClass(Posting);

// PostingSchema.index({ location: 1, position: 1 });
