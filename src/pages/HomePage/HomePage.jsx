import css from "./HomePage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function HomePage() {
  return (
    <div className={css.home}>
      <PageTitle> Welcome to Phonebook</PageTitle>
    </div>
  );
}
