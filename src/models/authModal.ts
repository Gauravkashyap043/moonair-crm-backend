import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface AdminModel {
  fullName: string;
  orgName: string;
  mobileNumber: number;
  password: string;
  userType: string;
  createdAt?: Date;
  updateAt?: Date;
}

const schema = new Schema<AdminModel>({
  fullName: { type: String, required: true },
  orgName: { type: String, required: true },
  mobileNumber: { type: Number, require: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export const AdiminSchema = model<AdminModel>(
  IDatabaseSchema.ADMINDATA,
  schema
);
