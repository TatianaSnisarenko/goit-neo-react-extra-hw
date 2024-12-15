import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import css from "./LoginForm.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const error = () => {
  toast("Login failed. Please try again.", {
    style: {
      color: "red",
      padding: "7px 10px",
    },
    icon: <FaExclamationTriangle />,
    duration: 1500,
  });
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values)).then((action) => {
      if (action.meta.requestStatus === "rejected") {
        error();
      }
    });
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Email
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>
            <label className={css.label}>
              Password
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </label>
            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
      {isLoggedIn && <Navigate to="/contacts" />}
    </>
  );
}
