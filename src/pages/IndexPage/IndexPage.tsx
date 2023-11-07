import { useState } from "react";
import SuggestionList from "./components/SuggestionList/SuggestionList";
import { bookCategories } from "./helper";
import CategoryList from "../../types/types";
import FavouriteBooks from "./components/FavouriteBooks/FavouriteBooks";
const IndexPage = () => {
  const getRandomCategory = (usedCategories: any[]) => {
    const unusedCategories = bookCategories.filter(
      ({ c }) => !usedCategories.includes(c)
    );
    const randomCategory =
      unusedCategories[Math.floor(Math.random() * unusedCategories.length)];
    return randomCategory.c;
  };

  const [usedCategories] = useState([]);

  const randomCategories = Array.from({ length: 3 }, () =>
    getRandomCategory(usedCategories)
  );

  return (
    <>
      <FavouriteBooks />
      {randomCategories?.map((category, index) => (
        <SuggestionList key={index} c={category} />
      ))}
    </>
  );
};

export default IndexPage;
