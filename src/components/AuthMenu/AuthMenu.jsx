import { NavLink } from "react-router-dom";
import css from "./AuthMenu.module.css";
import { buildLinkClass } from "../../utils/utils";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

export default function AuthMenu() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className={css.authMenu}>
      {!isLoggedIn ? (
        <>
          <NavLink
            to="/register"
            className={(props) => buildLinkClass({ ...props, css })}
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={(props) => buildLinkClass({ ...props, css })}
          >
            Log In
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className={(props) => buildLinkClass({ ...props, css })}
          onClick={() => dispatch(logout())}
        >
          Logout
        </NavLink>
      )}
    </div>
  );
}
