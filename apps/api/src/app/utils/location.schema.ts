import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Location {
  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  address: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
