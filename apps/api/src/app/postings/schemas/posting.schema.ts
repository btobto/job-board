import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from '../../companies/schemas/company.schema';
import { User } from '../../users/schemas/user.schema';

export type PostingDocument = HydratedDocument<Posting>;

@Schema()
export class Posting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company ' })
  company: Company;

  @Prop({ required: true })
  position: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  datePosted: Date;

  @Prop()
  remote: boolean;

  @Prop([String])
  requirements: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  applicants: User[];
}

export const PostingSchema = SchemaFactory.createForClass(Posting);
