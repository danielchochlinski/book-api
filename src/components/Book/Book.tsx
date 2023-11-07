import Tooltip from "@mui/material/Tooltip";
import s from "./Book.module.scss";
import { useState } from "react";

interface IBook {
  name: string;
  thumb: string;
  authors: string[];
  cat: string[];
  id: string;
}

const shortenFunction = (author: string) => {
  const maxLength = 10;
  if (author.length <= maxLength) {
    return author;
  }
  return author.slice(0, maxLength) + "...";
};

const Book = ({ name, thumb, authors, cat, id }: IBook) => {
  const [, setId] = useState("");
  console.log(name);
  return (
    <div className={s.container} onClick={() => setId(id)}>
      <img src={thumb} alt={thumb} />
      <span>{name}</span>
      <div>
        {authors?.map((el) => (
          <Tooltip title={el} key={el}>
            <span>{shortenFunction(el)}</span>
          </Tooltip>
        ))}
      </div>
      <span>{cat}</span>
    </div>
  );
};

export default Book;
