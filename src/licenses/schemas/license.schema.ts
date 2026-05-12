import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class License extends Document {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true })
  durationDays: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const LicenseSchema = SchemaFactory.createForClass(License);