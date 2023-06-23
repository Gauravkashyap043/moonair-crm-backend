"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complainFormSchema = void 0;
var mongoose_1 = require("mongoose");
var IDatabaseSchema_1 = require("../interfaces/IDatabaseSchema");
var schema = new mongoose_1.Schema({
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
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});
exports.complainFormSchema = (0, mongoose_1.model)(IDatabaseSchema_1.IDatabaseSchema.COMPLAINFORM, schema);
