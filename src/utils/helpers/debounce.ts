export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const shortenFunction = (author: string) => {
  const maxLength = 10;
  if (author.length <= maxLength) {
    return author;
  }
  return author.slice(0, maxLength) + "...";
};
