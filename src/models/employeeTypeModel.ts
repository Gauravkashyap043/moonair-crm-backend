import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface EmployeeTypeModel {
  type: string;
  isActive?: false;
}

const schema = new Schema<EmployeeTypeModel>({
  type: { type: String, required: true },
  isActive: { type: Boolean, default: false },
});

export const EmployeeTypeSchema = model<EmployeeTypeModel>(
  IDatabaseSchema.EMPLOYEE_TYPE,
  schema
);
