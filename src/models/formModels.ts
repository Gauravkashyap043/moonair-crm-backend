import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface Complaint {
  complainId: string;
  registerBy?: Schema.Types.ObjectId;
  customerName: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  dopDate?: Date;
  problem: string;
  complainStatus: string;
  updatedBy?: Schema.Types.ObjectId;
  assignedTo?: Schema.Types.ObjectId;
  // files:string;
}

const schema = new Schema<Complaint>(
  {
    complainId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    altPhoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    dopDate: {
      type: Date,
      required: false,
    },
    problem: {
      type: String,
      required: true,
    },
    registerBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.EMPLOYEE,
    },
    complainStatus: {
      type: String,
      default: "PENDING",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.EMPLOYEE,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.EMPLOYEE,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const complainFormSchema = model<Complaint>(
  IDatabaseSchema.COMPLAINFORM,
  schema
);
