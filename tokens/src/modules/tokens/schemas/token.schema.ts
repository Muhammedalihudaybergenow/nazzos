import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import mongoose from 'mongoose';
export type TokenDocument = Token & Document;
@Schema()
export class Token {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  fcm: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  refresh: string;

  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  userId: number;
  constructor(entity?: Partial<Token>) {
    Object.assign(this, entity);
  }
}

export const TokenSchema = SchemaFactory.createForClass(Token);
