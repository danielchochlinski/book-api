import React, { useState, useContext, useEffect } from "react";
import s from "./Header.module.scss";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { debounce } from "../../utils/helpers/debounce";
import BooksContext from "../../context/BooksContext";
import {
  uniqueID,
  useNotification,
} from "../../context/notifications/NotificationProvider";
const apiKey = import.meta.env.VITE_REACT_APP_BOOK_API_KEY;

const Header: React.FC = () => {
  const booksCtx = useContext(BooksContext);
  const notification = useNotification();

  const [searchType, setSearchType] = useState<string>("intitle");
  const [input, setInput] = useState<string>("");

  // const [isTyping, setIsTyping] = useState<boolean>(false);

  const fetchData = async (startIndex: number) => {
    if (input.length === 0) return;
    try {
      booksCtx.setBooksContext([]);
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: `${searchType}:${input}`,
            key: apiKey,
            country: "US",
            maxResults: 6,
            startIndex,
          },
        }
      );
      console.log(booksCtx.pagination);
      booksCtx.setBooksContext(response.data.items);
    } catch (err) {
      notification({
        id: uniqueID(),
        type: "ERROR",
        message: "UPS something went wrong",
      });
      console.log(err);
    }
  };
  const debouncedFetchData = debounce(fetchData, 2000);

  useEffect(() => {
    if (booksCtx.isTyping) {
      debouncedFetchData(booksCtx.pagination);
    }
  }, [booksCtx.isTyping === true, booksCtx.pagination]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    booksCtx.setIsTyping(true);

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      booksCtx.setIsTyping(false);
    }, 2000);
  };

  let typingTimer: NodeJS.Timeout;

  return (
    <div className={s.container}>
      <Input
        placeholder="Please query your search"
        className={s.input}
        onChange={handleInputChange}
        value={input}
        startDecorator={
          {
            title: "Title",
            author: "Author",
            publisher: "Publisher",
          }[searchType]
        }
        endDecorator={
          <>
            <Divider orientation="vertical" />
            <Select
              variant="plain"
              value={searchType}
              onChange={(_, value) => setSearchType(value!)}
              slotProps={{
                listbox: {
                  variant: "outlined",
                },
              }}
            >
              <Option value="intitle">Title</Option>
              <Option value="inauthor">Author</Option>
              <Option value="inpublisher">Publisher</Option>
            </Select>
          </>
        }
      />

      {/* <div className={s.img_container}>
        <img src="/profile.png" alt="" />
      </div> */}
    </div>
  );
};

export default Header;
