import { useState } from "react";
import SuggestionList from "./components/SuggestionList/SuggestionList";
import { bookCategories } from "./helper";
import FavouriteBooks from "./components/FavouriteBooks/FavouriteBooks";
import SearchedBooks from "./components/SearchedBooks/SearchedBooks";
const IndexPage = () => {
  const getRandomCategory = (usedCategories: any[]) => {
    const unusedCategories = bookCategories.filter(
      ({ c }) => !usedCategories.includes(c)
    );
    const randomCategory =
      unusedCategories[Math.floor(Math.random() * unusedCategories.length)];
    return randomCategory.c;
  };

  const [usedCategories] = useState<[]>([]);

  const randomCategories = Array.from({ length: 3 }, () =>
    getRandomCategory(usedCategories)
  );

  return (
    <>
      <SearchedBooks />
      <FavouriteBooks />
      {randomCategories?.map((category, index) => (
        <SuggestionList key={index} c={category} />
      ))}
    </>
  );
};

export default IndexPage;
