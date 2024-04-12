import * as Yup from "yup";

export const FeedSchema = Yup.object().shape({
  name: Yup.string().label("Feed name").required(),
  unitPrice: Yup.number().label("Unit price").required(),
});

export const LoanSchema = Yup.object().shape({
  amount: Yup.number().label("Amount").required(),
  interestRate: Yup.number().label("Interest rate").required(),
});
