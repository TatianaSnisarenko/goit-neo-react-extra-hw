import css from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.message}>Such page does not exist</h1>
    </div>
  );
}
