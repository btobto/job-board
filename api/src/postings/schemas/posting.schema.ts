import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from '../../companies/schemas';
import { Person } from '../../persons/schemas';
import { referenceValidator } from '../../common/validators';
import { Location, LocationSchema } from '../../common/schemas';
import { UserType } from 'src/common/enums';

export type PostingDocument = HydratedDocument<Posting>;

@Schema({
  toJSON: {
    transform: (doc, ret, options) => {
      delete ret.applicants;
      return ret;
    },
  },
})
export class Posting {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: UserType.Company,
    index: true,
    required: true,
    validate: referenceValidator,
  })
  company: Company | mongoose.Types.ObjectId;

  @Prop({ type: LocationSchema, _id: false })
  location: Location;

  @Prop({ required: true })
  position: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now, immutable: true })
  datePosted: Date;

  @Prop()
  dateUpdated: Date;

  @Prop({ required: true })
  remoteAvailable: boolean;

  @Prop()
  salary: string;

  @Prop([String])
  requirements: string[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserType.Person,
        validate: referenceValidator,
      },
    ],
  })
  applicants: Person[];
}

export const PostingSchema = SchemaFactory.createForClass(Posting);
