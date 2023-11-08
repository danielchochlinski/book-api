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
  setBooksContext: Dispatch<SetStateAction<string[]>>;
  setPaginationContext: (status: number) => void;
  pagination: number;
}

const BooksContext = createContext<BooksContextValue>({
  books: [""],
  setBooksContext: () => {},
  setPaginationContext: () => {},
  pagination: 0,
});

export const BooksContextProvider = ({ children }: TContext) => {
  const [books, setBooks] = useState<string[]>([]);

  const setBooksContext: BooksContextValue["setBooksContext"] = (status) => {
    setBooks(status);
  };

  const [pagination, setPagination] = useState<number>(0);
  const setPaginationContext = (status: number) => {
    setPagination(status);
  };
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooksContext,
        setPaginationContext,
        pagination,
      }}
    >
      <div>{children}</div>
    </BooksContext.Provider>
  );
};

export default BooksContext;
