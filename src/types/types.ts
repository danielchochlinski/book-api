export default interface VolumeInfo {
  includes(c: string): unknown;
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
}
export default interface GoogleBookItem {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  // Add any other properties you want to include from each item
}

export default interface CategoryList {
  c: string;
}
