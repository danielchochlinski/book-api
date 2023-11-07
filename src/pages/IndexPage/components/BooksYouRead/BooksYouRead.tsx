import s from "./styles.module.scss";

const BooksYouRead = () => {
  return (
    <div className={s.container}>
      <h2>Books you read last</h2>
      <div className={s.list}></div>
    </div>
  );
};

export default BooksYouRead;
