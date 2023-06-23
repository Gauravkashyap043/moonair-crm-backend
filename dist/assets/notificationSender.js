"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
var twilio_1 = __importDefault(require("twilio"));
var accountSid = 'AC2c16d956ea6563694e2a134fba06da2d';
var authToken = 'd2d996944ea45b3085712acd6ff99cb9';
var client = (0, twilio_1.default)(accountSid, authToken);
function sendSMS(to, message) {
    client.messages
        .create({
        body: message,
        from: '+919625865092',
        to: to,
    })
        .then(function (message) { return console.log('SMS sent:', message.sid); })
        .catch(function (error) { return console.error('Error sending SMS', error); });
}
exports.sendSMS = sendSMS;
