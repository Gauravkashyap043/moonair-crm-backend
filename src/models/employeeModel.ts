import mongoose, { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface EmployeesModel {
  fullName: string;
  orgName: string;
  mobileNumber: number;
  password: string;
  employeeType: Schema.Types.ObjectId;
  createdAt?: Date;
  updateAt?: Date;
}

const schema = new Schema<EmployeesModel>({
  fullName: { type: String, required: false },
  orgName: { type: String, required: true },
  mobileNumber: { type: Number, require: false },
  password: { type: String, required: false },
  employeeType: {
    type: [Schema.Types.ObjectId],
    ref: IDatabaseSchema.EMPLOYEE_TYPE,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export const EmployeesSchema = model<EmployeesModel>(
  IDatabaseSchema.EMPLOYEE,
  schema
);
