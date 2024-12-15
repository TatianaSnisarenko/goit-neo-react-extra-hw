import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  return (
    <div className={css.login}>
      <Toaster />
      <PageTitle>Log In</PageTitle>
      <LoginForm />
    </div>
  );
}
