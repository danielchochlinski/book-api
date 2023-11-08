import { useEffect, useState, useContext } from "react";
import s from "./FavBook.module.scss";
import axios from "axios";
import VolumeInfo from "../../types/types";
import { shortenFunction } from "../../utils/helpers/debounce";
import { Tooltip } from "@mui/joy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavouriteContext from "../../context/FavouriteContext";
interface TFavBook {
  bookId: string;
}
const FavBook = ({ bookId }: TFavBook) => {
  const [info, setInfo] = useState<VolumeInfo>();
  const [id, setId] = useState("");
  const favCtx = useContext(FavouriteContext);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );

      setInfo(response.data.volumeInfo);
      setId(response.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleFavourite = (e: { stopPropagation: () => void }) => {
    favCtx.removeFavouriteContext(id);

    e.stopPropagation();
  };

  return (
    <div className={s.container}>
      <img
        src={info?.imageLinks?.smallThumbnail}
        alt={info?.imageLinks?.smallThumbnail}
      />
      <div>
        <span>{info?.title}</span>
        {info?.categories?.[0] && (
          <Tooltip title={info?.categories[0]}>
            <span>{shortenFunction(info?.categories[0])}</span>
          </Tooltip>
        )}
        <span>Pages: {info?.pageCount}</span>
        <span>Published: {info?.publishedDate}</span>

        <FavoriteIcon
          className={s.heart}
          onClick={(e) => handleFavourite(e)}
          style={{ color: "#c30065" }}
        />
      </div>
    </div>
  );
};

export default FavBook;
