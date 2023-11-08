import { SetStateAction, useState, useEffect } from "react";
import s from "./Header.module.scss";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import axios from "axios";
import { debounce } from "../../utils/helpers/debounce";
const apiKey = import.meta.env.VITE_REACT_APP_BOOK_API_KEY;

const Header = () => {
  const [searchType, setSearchType] = useState("intitle");
  const [input, setInput] = useState("");
  const [, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: `${searchType}:${input}`,
              key: apiKey,
              country: "US",
            },
          }
        );
        console.log(response);
        setSearchResults(response.data.items);
      } catch (err) {
        console.log(err);
      }
    };

    //limit amount of API calls
    const debouncedFetchData = debounce(fetchData, 4000);

    debouncedFetchData();
  }, [searchType, input]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInput(e.target.value);
  };

  return (
    <div className={s.container}>
      <Input
        placeholder="Please query your search"
        className={s.input}
        onChange={handleInputChange}
        sx={{ width: 300 }}
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

      <div className={s.img_container}>
        <img src="/profile.png" alt="" />
      </div>
    </div>
  );
};

export default Header;
