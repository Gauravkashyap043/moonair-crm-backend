// import { model, Schema } from "mongoose";
// import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

// export interface employerModel {
//   fullName: string;
//   orgName: string;
//   mobileNumber: number;
//   password: string;
//   employeeType: string;
//   createdAt?: Date;
//   updateAt?: Date;
// }

// const schema = new Schema<employerModel>({
//   fullName: { type: String, required: true },
//   orgName: { type: String, required: true },
//   mobileNumber: { type: Number, require: true },
//   password: { type: String, required: true },
//   employeeType: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updateAt: { type: Date, default: Date.now },
// });

// export const EmployerSchema = model<employerModel>(
//   IDatabaseSchema.COMPLAINFORM,
//   schema
// );
