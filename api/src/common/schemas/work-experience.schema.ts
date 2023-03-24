import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WorkExperience {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  yearFrom: number;

  @Prop()
  yearTo: number;
}

export const WorkExperienceSchema =
  SchemaFactory.createForClass(WorkExperience);
