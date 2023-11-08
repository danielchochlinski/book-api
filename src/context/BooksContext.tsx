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
  isTyping: boolean;
  setIsTyping: (status: boolean) => void;
  loading: boolean;
  setLoading: (status: boolean) => void;
}

const BooksContext = createContext<BooksContextValue>({
  books: [""],
  setBooksContext: () => {},
  setPaginationContext: () => {},
  pagination: 0,
  isTyping: true,
  setIsTyping: () => {},
  loading: false,
  setLoading: () => {},
});

export const BooksContextProvider = ({ children }: TContext) => {
  const [books, setBooks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const setBooksContext: BooksContextValue["setBooksContext"] = (status) => {
    setBooks(status);
  };

  const [pagination, setPagination] = useState<number>(0);
  const setPaginationContext = (status: number) => {
    setPagination(status);
    setIsTyping(true);
  };
  return (
    <BooksContext.Provider
      value={{
        books,
        setBooksContext,
        setPaginationContext,
        pagination,
        isTyping,
        setIsTyping,
        loading,
        setLoading,
      }}
    >
      <div>{children}</div>
    </BooksContext.Provider>
  );
};

export default BooksContext;
