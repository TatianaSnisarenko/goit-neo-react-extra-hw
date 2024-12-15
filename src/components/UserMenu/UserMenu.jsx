import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";
import { buildLinkClass } from "../../utils/utils";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function UserMenu() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.userMenu}>
      <NavLink to="/" className={(props) => buildLinkClass({ ...props, css })}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={(props) => buildLinkClass({ ...props, css })}
        >
          Contacts
        </NavLink>
      )}
    </div>
  );
}
