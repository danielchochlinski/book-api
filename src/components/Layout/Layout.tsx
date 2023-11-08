import Header from "../Header/Header";
import s from "./Layout.module.scss";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
