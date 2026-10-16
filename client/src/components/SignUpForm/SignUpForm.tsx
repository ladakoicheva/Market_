import { Formik, Form, Field, ErrorMessage } from "formik";
import style from '../Modal/Modal.module.css';
import Button from "../Button/Button";
import schema from "./schema";
import { useAppDispatch } from "../../redux/hooks";
import { register } from "../../features/user/userSlice";

type Props = {
  closeModal: () => void;
};

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm({ closeModal }: Props) {
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const registerUser = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      const res = await dispatch(register(values)).unwrap();

      if (res.ok) {
        resetForm();
        closeModal();
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={registerUser}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <label htmlFor="email">Email</label>
          <div className={style.modalItem}>
            <Field id="email" type="email" name="email" placeholder="Email" className ={touched.email && errors.email ? style.err : ''}/>
          </div>
          {touched.email && errors.email && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="email" />
            </div>
          )}

          <label htmlFor="password">Password</label>
          <div className={style.modalItem}>
            <Field
              className ={touched.password && errors.password ? style.err : ''}
              id="password"
              type="password"
              name="password"
              placeholder="Password" />
          </div>
          {touched.password && errors.password && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="password" />
            </div>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={style.modalItem}>
            <Field id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm"
              className={touched.confirmPassword && errors.confirmPassword  ? style.err : ''} />
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              <ErrorMessage name="confirmPassword" />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            text="Sign Up"
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}