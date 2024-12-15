import css from "./Navigation.module.css";

import AuthMenu from "../AuthMenu/AuthMenu";
import UserMenu from "../UserMenu/UserMenu";

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <UserMenu />
        <AuthMenu />
      </nav>
    </header>
  );
}
