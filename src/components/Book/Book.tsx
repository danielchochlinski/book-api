import s from "./Book.module.scss";
import { useState, useContext } from "react";
import FavouriteContext from "../../context/FavouriteContext";
import { shortenFunction } from "../../utils/helpers/debounce";
import { Tooltip } from "@mui/joy";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface IBook {
  name: string;
  thumb: string;
  authors: string[];
  cat: string[];
  id: string;
}

const Book = ({ name, thumb, authors, cat, id }: IBook) => {
  const favCtx = useContext(FavouriteContext);

  const handleFavourite = (e: { stopPropagation: () => void }) => {
    favCtx?.favouriteList.includes(id)
      ? favCtx.removeFavouriteContext(id)
      : favCtx.addFavouriteContext(id);
    console.log(id);
    e.stopPropagation();
  };

  const isFavourite = favCtx?.favouriteList?.includes(id);

  return (
    <div className={s.container}>
      {isFavourite ? (
        <FavoriteIcon
          className={s.heart}
          onClick={(e) => handleFavourite(e)}
          style={{ color: "#c30065" }}
        />
      ) : (
        <FavoriteBorderIcon
          className={s.heart}
          onClick={(e) => handleFavourite(e)}
        />
      )}
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
