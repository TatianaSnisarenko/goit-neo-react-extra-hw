import { useDispatch } from "react-redux";
import { useId } from "react";
import { register } from "../../redux/auth/operations";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./RegistrationForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label} htmlFor={nameFieldId}>
            Name
            <Field id={nameFieldId} type="text" name="name" />
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>
          <label className={css.label} htmlFor={emailFieldId}>
            Email
            <Field id={emailFieldId} type="email" name="email" />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>
          <label className={css.label} htmlFor={passwordFieldId}>
            Password
            <Field id={passwordFieldId} type="password" name="password" />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </label>
          <button type="submit" className={css.button} disabled={isSubmitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}
