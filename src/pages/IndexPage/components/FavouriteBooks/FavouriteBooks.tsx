import { useContext } from "react";
import s from "./styles.module.scss";
import FavouriteContext from "../../../../context/FavouriteContext";
import FavBook from "../../../../components/FavBook/FavBook";

const FavouriteBooks = () => {
  const favCtx = useContext(FavouriteContext);

  return (
    <div className={s.container}>
      <h2>Your favourite</h2>
      <div className={s.list}>
        {favCtx.favouriteList.map((el) => (
          <FavBook key={el + "favbook"} bookId={el} />
        ))}
      </div>
    </div>
  );
};

export default FavouriteBooks;
