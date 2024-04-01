import * as Yup from "yup";
export const ApplyLoanSchema = Yup.object().shape({
  loan: Yup.string().required().label("Loan"),
  type: Yup.string().required().label("Type"),
  amount: Yup.number().label("Amount"),
  feeds: Yup.array(
    Yup.object({
      feed: Yup.string().required().label("Feed"),
      quantity: Yup.number().default(1),
    })
  ),
});
