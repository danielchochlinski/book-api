import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Searchbar from "../Header/Header";

const Layout = () => {
  return (
    <div className={s.container}>
      <Searchbar />
      <Outlet />
    </div>
  );
};

export default Layout;
