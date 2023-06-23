import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface employeesModel {
  companyId: string;
  fullName: string;
  orgName: string;
  mobileNumber: number;
  emailId: string;
  password: string;
  employeeStatus: string;
  userType: string;
  createdAt?: Date;
  updateAt?: Date;
}

const schema = new Schema<employeesModel>({
  companyId: { type: String, required: true },
  fullName: { type: String, required: false },
  orgName: { type: String, required: true },
  mobileNumber: { type: Number, require: false },
  emailId: { type: String, required: true },
  password: { type: String, required: false },
  employeeStatus: { type: String, required: true },
  userType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

export const EmployeesSchema = model<employeesModel>(
  IDatabaseSchema.ADMINDATA,
  schema
);
