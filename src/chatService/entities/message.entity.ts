import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userFrom: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userTo: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Chatroom' })
  chatroom: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: false })
  isSeen: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
