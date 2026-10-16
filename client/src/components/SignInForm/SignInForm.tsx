import { Formik, Form, Field, ErrorMessage } from "formik";
import style from '../Modal/Modal.module.css';
import Button from "../Button/Button";
import schema from "./schema";
import { loginUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

type Props = {
  closeModal: () => void;
};

type FormValues = {
  email: string;
  password: string;
};

export default function SignInForm({ closeModal }: Props) {
  const [backError, setBackError] = useState('');
  const dispatch = useAppDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const logIn = async (formData: FormValues, { resetForm }: { resetForm: () => void }) => {
    try {
      setBackError('');
      const res = await dispatch(loginUser(formData)).unwrap();
      if (res.ok) {
        resetForm();
        closeModal();
      } 
    } catch (err) {
      setBackError(err as string);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={logIn}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <label htmlFor="email">Email</label>
          <div className={style.modalItem} >
            <Field
              className ={touched.email && errors.email|| backError ? style.err : ''}
              id="email"
              type="email"
              name="email"
              placeholder="Email"
            />
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
          <div className={`${style.modalItem} ${touched.password && errors.password || backError ? style.err : ''}`}>
            <Field 
              className ={touched.password && errors.password || backError? style.err : ''}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
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

          {backError && (
            <div className={style.errors}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#ff4d4d" />
                <path d="M12 7V13" stroke="white" stroke-width="2" stroke-linecap="round" />
                <circle cx="12" cy="16" r="1" fill="white" />
              </svg>
              {backError}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            text="Sign In"
            isAsync={true}
          />
        </Form>
      )}
    </Formik>
  );
}