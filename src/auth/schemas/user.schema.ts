import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import { Role } from "../enums/role.enum";

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email Enter'] })
  email: string;

  @Prop()
  password: string;

  //     @Prop(
  //         {type: [{type: String, enum: Role}],
  //         default: [Role.User],
  //     })
  //    role: Role[]

  @Prop({ enum: Role, default: Role.User })
  role: Role; // Modified to hold a single role instead of an array
}

export const UserSchema = SchemaFactory.createForClass(User);