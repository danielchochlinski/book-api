import { useEffect, useState, useContext, useMemo } from "react";
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

const backgrounds = [
  "linear-gradient(45deg, #ffcccb, #f6f6f6)",
  "repeating-linear-gradient(45deg, #f6f6f6, #f6f6f6 10px, #e0e0e0 10px, #e0e0e0 20px)",
  "linear-gradient(45deg, #ffec61, #ff5773)",
  "linear-gradient(45deg, #67e0a3, #09a6e6)",
  "linear-gradient(45deg, #ffa34d, #ff4773)",
  "linear-gradient(45deg, #6bc1ff, #4758e6)",
  "linear-gradient(45deg, #ff6f61, #ffb861)",
  "linear-gradient(45deg, #84fab0, #8fd3f4)",
  "linear-gradient(45deg, #ff4b1f, #ff9068)",
  "linear-gradient(45deg, #f9d423, #e65c00)",
  "linear-gradient(45deg, #ffb6b9, #f2a2a0)",
  "linear-gradient(45deg, #a18cd1, #fbc2eb)",
  "linear-gradient(45deg, #a8edea, #fed6e3)",
  "linear-gradient(45deg, #6a11cb, #2575fc)",
  "linear-gradient(45deg, #2980b9, #6dd5fa)",
  "linear-gradient(45deg, #8e44ad, #e4b7e5)",
  "linear-gradient(45deg, #3498db, #a6c0fe)",
  "linear-gradient(45deg, #e74c3c, #f8b471)",
  "linear-gradient(45deg, #2ecc71, #abebc6)",
  "linear-gradient(45deg, #e67e22, #fde3a7)",
  // Add more background styles if desired
];

const FavBook = ({ bookId }: TFavBook) => {
  const [info, setInfo] = useState<VolumeInfo>();
  const [id, setId] = useState<string>("");
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

  const randomBackground = useMemo(() => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
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
      <div style={{ background: randomBackground }}>
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
