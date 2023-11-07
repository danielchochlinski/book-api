interface IBook {
  name: string;
}
const Book = ({ name }: IBook) => {
  return <div>{name}</div>;
};

export default Book;
