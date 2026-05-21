import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: 'user', enum: ['user', 'admin', 'staff'] })
  role!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ default: false })
  isDeleted!: boolean;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  isStatus!: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
