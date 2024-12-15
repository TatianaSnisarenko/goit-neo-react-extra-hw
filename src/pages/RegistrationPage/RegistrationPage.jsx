import css from "./RegistrationPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function RegistrationPage() {
  return (
    <div className={css.register}>
      <PageTitle>Sign Up</PageTitle>
      <RegistrationForm />
    </div>
  );
}
