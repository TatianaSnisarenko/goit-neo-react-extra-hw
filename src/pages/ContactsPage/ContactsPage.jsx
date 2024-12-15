import css from "./ContactsPage.module.css";
import clsx from "clsx";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import {
  selectLoading,
  selectError,
  selectHasContacts,
} from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const hasContacts = useSelector(selectHasContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div className={clsx({ [css.phonebook]: hasContacts })}>
        <div className={css.formWithTitle}>
          <PageTitle>Phonebook</PageTitle>
          <div className={css.formsHolder}>
            <ContactForm />
            <SearchBox />
          </div>
        </div>
        {!isLoading && !error && <ContactList />}
      </div>
      {isLoading && !error && <Loader />}
      {!isLoading && error && <ErrorMessage />}
    </>
  );
}
