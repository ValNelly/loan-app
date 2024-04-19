import * as Yup from "yup";

export const FeedSchema = Yup.object().shape({
  name: Yup.string().label("Feed name").required(),
  unitPrice: Yup.number().label("Unit price").required(),
});

export const LoanSchema = Yup.object().shape({
  amount: Yup.number().label("Amount").required(),
  interestRate: Yup.number().label("Interest rate").required(),
});

export const UserSchema = Yup.object().shape({
  name: Yup.string().label("Name").optional(),
  username: Yup.string().label("Username").optional(),
  email: Yup.string().email().optional().label("Email"),
  phoneNumber: Yup.string().optional().label("Phone number"),
  gender: Yup.string().label("Gender").optional().oneOf(["MALE", "FEMALE"]),
  isStaff: Yup.boolean().optional(),
});
