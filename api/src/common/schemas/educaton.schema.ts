import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop()
  degree: string;

  @Prop()
  grade: number;

  @Prop({ required: true })
  yearFrom: number;

  @Prop()
  yearTo: number;
}

export const EducationSchema = SchemaFactory.createForClass(Education);
