import { useEffect, useState } from "react";
import axios from "axios";
import Book from "../../../../components/Book/Book";
import GoogleBookItem from "../../../../types/types";
import s from "./style.module.scss";
const apiKey = import.meta.env.VITE_REACT_APP_BOOK_API_KEY;
interface TSuggestionList {
  c: string;
}
const SuggestionList = ({ c }: TSuggestionList) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: `subject:${c}`,
              maxResults: 6,
              key: apiKey,
              country: "US",
            },
          }
        );

        setBooks(response.data.items);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };

    fetchPopularBooks();
  }, []);
  console.log(books);
  return (
    <div className={s.container}>
      <h4>{c.toUpperCase()}</h4>

      <div className={s.list}>
        {books?.map((el: GoogleBookItem) => (
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
    </div>
  );
};

export default SuggestionList;
