
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong Email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),

});

export default schema