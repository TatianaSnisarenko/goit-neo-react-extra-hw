import "modern-normalize/modern-normalize.css";
import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";
import Container from "./components/Container/Container";
import RestrictedRoute from "./guards/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./guards/PrivateRoute/PrivateRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RestrictedRoute component={<RegistrationPage />} />}
            />
            <Route
              path="/login"
              element={<RestrictedRoute component={<LoginPage />} />}
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      )}
    </>
  );
};

export default App;
