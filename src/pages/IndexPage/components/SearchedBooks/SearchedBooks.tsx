import { useContext, useState, useEffect } from "react";
import BooksContext from "../../../../context/BooksContext";
import Book from "../../../../components/Book/Book";
import s from "./style.module.scss"; // Import the SCSS module
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const SearchedBooks = () => {
  const booksCtx = useContext(BooksContext);
  const [showBooks, setShowBooks] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  useEffect(() => {
    setShowBooks(booksCtx.books.length === 0 ? true : false);
  }, [booksCtx.books]);
  const handleNextClick = () => {
    booksCtx.setPaginationContext(booksCtx.pagination + 6);
  };

  const handlePrevClick = () => {
    if (booksCtx.pagination === 0) {
      setDisabled(true);
    }
    booksCtx.setPaginationContext(booksCtx.pagination - 6);
  };
  return (
    <div className={`${s.container} ${showBooks ? s.hide : s.show}`}>
      {booksCtx.books.map((el: any) => (
        <Book
          key={el.volumeInfo?.title + "search book"}
          name={el.volumeInfo?.title}
          thumb={el.volumeInfo.imageLinks?.smallThumbnail || ""}
          authors={el.volumeInfo.authors}
          cat={el.volumeInfo.categories || [""]}
          id={el.id}
        />
      ))}

      <ArrowBackIosIcon
        sx={{ color: disabled ? "gray" : "" }}
        onClick={handlePrevClick}
        className={s.arrow_back}
      />

      <ArrowForwardIosIcon
        onClick={handleNextClick}
        className={s.arrow_forward}
      />
    </div>
  );
};

export default SearchedBooks;
