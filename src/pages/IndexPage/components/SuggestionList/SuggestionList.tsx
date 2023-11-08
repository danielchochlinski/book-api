import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Book from "../../../../components/Book/Book";
import GoogleBookItem from "../../../../types/types";
import s from "./style.module.scss";
import {
  uniqueID,
  useNotification,
} from "../../../../context/notifications/NotificationProvider";
const apiKey = import.meta.env.VITE_REACT_APP_BOOK_API_KEY;
interface TSuggestionList {
  c: string;
}
const SuggestionList = ({ c }: TSuggestionList) => {
  const [books, setBooks] = useState([]);
  const notification = useNotification();
  useEffect(() => {
    const fetchBooks = async () => {
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
        notification({
          id: uniqueID(),
          type: "ERROR",
          message: "UPS something went wrong",
        });
        console.error("Error fetching popular books:", error);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className={s.container}>
      <h3>{c.toUpperCase()}</h3>

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
