import * as Yup from "yup"

export const LoginSchema =  Yup.object().shape({
    username: Yup.string().label("Username").required(),
    password: Yup.string().label("Password").required(),
  });


export  const RegisterSchema = Yup.object().shape({
    username: Yup.string().label("Username").required(),
    email: Yup.string().label("Email").required(),
    password: Yup.string().label("Password").required(),
    confirm_password: Yup.string().label("Confirm Password").required(),
  });