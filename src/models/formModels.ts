import { model, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface Complaint {
  complainId: string;
  dealerName: string;
  registerBy: string;
  customerName: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  dopDate: Date;
  problem: string;
  // complainStatus:string;
  // files:string;
}

const schema = new Schema<Complaint>({
  complainId: {
    type: String,
    required: true
  },
  dealerName: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  altPhoneNumber: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  dopDate: {
    type: Date,
    required: true
  },
  problem: {
    type: String,
    required: true
  }
},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

export const complainFormSchema = model<Complaint>(
  IDatabaseSchema.COMPLAINFORM,
  schema
);