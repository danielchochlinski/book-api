import { createContext, ReactNode, useEffect, useState } from "react";

interface TFavouriteContext {
  children: ReactNode;
}

interface FavouriteContextValue {
  favouriteList: string[];
  highlightFavourite: boolean;
  setHighlightFavouriteContext: (status: boolean) => void;
  addFavouriteContext: (status: string) => void;
  removeFavouriteContext: (status: string) => void;
  seedFavouriteList: () => void;
}

const FavouriteContext = createContext<FavouriteContextValue>({
  favouriteList: [""],
  highlightFavourite: false,
  setHighlightFavouriteContext: (_status: boolean) => {},
  addFavouriteContext: (_status: string) => {},
  removeFavouriteContext: (_status: string) => {},
  seedFavouriteList: () => {},
});

export const FavouriteContextProvider = ({ children }: TFavouriteContext) => {
  //used for favourite list
  const [favouriteList, setFavouriteList] = useState<string[]>([]);

  //used for highlighting favourite star in the navigation
  const [highlightFavourite, setHighlightFavourite] = useState<boolean>(false);
  const setHighlightFavouriteContext = (status: boolean) => {
    setHighlightFavourite(status);
  };

  const addFavouriteContext = (status: string) => {
    setFavouriteList([...favouriteList, status]);
    setHighlightFavourite(true);

    if (localStorage.getItem("favouriteList") == null) {
      localStorage.setItem("favouriteList", "[]");
    }
    let oldData = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    const exists = Array.isArray(oldData) ? oldData.includes(status) : false;
    if (!exists) {
      oldData.push(status);
      localStorage.setItem("favouriteList", JSON.stringify(oldData));
    } else {
      return;
    }
  };

  const removeFavouriteContext = (status: string) => {
    setFavouriteList(favouriteList.filter((item: string) => item !== status));

    const list = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    const filteredList = Array.isArray(list)
      ? list.filter((item: string) => item !== status)
      : [];
    localStorage.setItem("favouriteList", JSON.stringify(filteredList));
  };

  // seed favourite list with local storage if there is any
  const seedFavouriteList = () => {
    const list = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    if (list === null) {
      return;
    } else {
      setFavouriteList(list);
    }
  };

  // seed favourite list
  useEffect(() => {
    seedFavouriteList();
  }, []);

  return (
    <FavouriteContext.Provider
      value={{
        favouriteList,
        setHighlightFavouriteContext,
        highlightFavourite,
        addFavouriteContext,
        removeFavouriteContext,
        seedFavouriteList,
      }}
    >
      <div>{children}</div>
    </FavouriteContext.Provider>
  );
};

export default FavouriteContext;
