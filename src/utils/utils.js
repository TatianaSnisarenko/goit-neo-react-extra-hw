import clsx from "clsx";

export const buildLinkClass = ({ isActive, css }) => {
  return clsx(css.link, isActive && css.active);
};
