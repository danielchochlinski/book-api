import Book from "../../../../components/Book/Book";
import s from "./styles.module.scss";

const FavouriteBooks = () => {
  return (
    <div className={s.container}>
      <h2>Your favourite</h2>
      <div className={s.list}>
        {/* {books.map((el) => (
          <Book />
        ))} */}
      </div>
    </div>
  );
};

export default FavouriteBooks;
