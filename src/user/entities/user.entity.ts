import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export const userTypeName = 'user';

@Schema({
  timestamps: true,
  toObject: {
    transform: (_, ret) => {
      delete ret.pwd;
      delete ret.phone;
      return ret;
    },
  },
})
export class User extends Document {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    index: {
      unique: true,
    },
  })
  username: string;

  @Prop()
  pwd: string;

  @Prop({
    index: { unique: false },
  })
  phone: string;

  @Prop()
  phoneCode: String;

  @Prop()
  countryCode: String;

  @Prop({ default: '' })
  avatar: String;

  @Prop({ default: '' })
  code: String;

  @Prop({ default: '' })
  desc: String;

  referer: Types.ObjectId;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ default: false })
  recomm: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
