import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface TContext {
  children: ReactNode;
}

interface BooksContextValue {
  books: string[];
  setBooksContext: Dispatch<SetStateAction<string[]>>; // Updated type for setBooksContext
}

const BooksContext = createContext<BooksContextValue>({
  books: [""],
  setBooksContext: () => {},
});

export const BooksContextProvider = ({ children }: TContext) => {
  const [books, setBooks] = useState<string[]>([]);

  const setBooksContext: BooksContextValue["setBooksContext"] = (status) => {
    setBooks(status);
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        setBooksContext,
      }}
    >
      <div>{children}</div>
    </BooksContext.Provider>
  );
};

export default BooksContext;
