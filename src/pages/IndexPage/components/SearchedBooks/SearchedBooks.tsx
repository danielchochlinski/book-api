import { useContext, useState, useEffect } from "react";
import BooksContext from "../../../../context/BooksContext";
import Book from "../../../../components/Book/Book";
import s from "./style.module.scss"; // Import the SCSS module

const SearchedBooks = () => {
  const booksCtx = useContext(BooksContext);
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    setShowBooks(booksCtx.books.length === 0 ? true : false);
  }, [booksCtx.books]);
  console.log(showBooks);

  return (
    <div className={`${s.container} ${showBooks ? s.hide : s.show}`}>
      {booksCtx.books.map((el: any) => (
        <Book
          key={el.volumeInfo?.title}
          name={el.volumeInfo?.title}
          thumb={el.volumeInfo.imageLinks?.smallThumbnail || ""}
          authors={el.volumeInfo.authors}
          cat={el.volumeInfo.categories || [""]}
          id={el.id}
        />
      ))}
    </div>
  );
};

export default SearchedBooks;
