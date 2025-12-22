import { Book } from "../types/book.type";

// In-memory data store
let books: Book[] = [
    { id: 'B-1', title: 'Harry potter' },
    { id: 'B-2', title: 'Lord of the rings', date: '29-05-2001' }
];
// interface for Repository
// Explaination: Define the contract for data operations
export interface IBookRepository {
    createBook(book: Book): Book;
    getBooks(): Book[];
    findBookById(id: string): Book | undefined;
}

// export class MongoRepo implements IBookRepository {
// }

// In-memory implementation of IBookRepository
// Explaination: Simple in-memory data store for demonstration
export class BookRepository implements IBookRepository {
    createBook(book: Book): Book {
        books.push(book);
        return book;
    }
    
    getBooks(): Book[] {
        return books;
    }
    findBookById(id: string): Book | undefined {
        return books.find(book => book.id === id);
    }
}