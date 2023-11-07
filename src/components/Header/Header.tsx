import React from "react";
import s from "./Header.module.scss";
const Searchbar = () => {
  return (
    <div className={s.container}>
      <input type="text" placeholder="search for book" />

      <div className={s.img_container}>
        <img src="/profile.png" alt="" />
      </div>
    </div>
  );
};

export default Searchbar;
