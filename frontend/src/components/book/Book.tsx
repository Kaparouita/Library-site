import { Pagination } from "../pagination/Pagination";

// Book class equivalent
export class Book {
  id: number = 0; // uint
  createdAt: string = ''; // time.Time
  isbn: string = '';
  title: string = '';
  writer: string = '';
  type: string = '';
  publish_date: string = ''; // time.Time
  pages_number: number = 0; // uint
  photo: string = '';
  book_url: string = '';
  reviews: Review[] = []; // Array of Review objects

  constructor() {}
}

// BookResponse class equivalent
export class BookResponse {
  books: Book[] = []; // Array of Book objects
  total: number = 0; // int64

  constructor() {}
}

export class BookPerUni {
  group: string = '';
  total: number = 0;

  constructor() {}
}

// Review class equivalent
export class Review {
  id: number = 0; // uint
  book_id: number = 0; // uint
  user_name: string = '';
  rating: number = 0; // int
  comment: string = '';

  constructor() {}
}

// BookPagin class equivalent
export class BookPagin {
  pagination: Pagination = new Pagination(); // Pagination object
  max_year: number = 1200; // int
  min_year: number = 2023; // int

  constructor() {}
}

export default Book;
