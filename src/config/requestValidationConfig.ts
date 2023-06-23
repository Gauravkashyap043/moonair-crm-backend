import { body } from "express-validator";

export const requestValidationConfig = {
  employerRegister: [
    body("fullName", "Please enter valid name.").exists(),
    body("mobileNumber", "Enter a valid mobile number").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Password should be minimum 6 characters.")
      .exists()
      .isLength({ min: 6 }),
    body("orgName").exists(),
  ],
  employerLogin: [
    body("mobileNumber", "Enter a valid mobile number").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Password should be minimum 6 characters."),
  ],
  createEmployee: [body("emailId", "Enter a valid emailId.").isEmail()],
  employeeAuth: [
    body("fullName", "Enter a valid full name").isLength({
      min: 3,
    }),
    body("emailId", "Enter a valid emailId.").isEmail(),
    body("password", "Password should be minimum 6 characters.").isLength({
      min: 6,
    }),
    body("mobileNumber", "Enter a valid mobile number").isLength({
      min: 10,
      max: 10,
    }),
  ],
};
