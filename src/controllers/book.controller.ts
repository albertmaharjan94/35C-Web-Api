import { Request, Response } from "express";
import { z } from "zod";
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.type";
import { BookService } from "../services/book.service";

let bookService = new BookService();

export class BookController {
    createBook(req: Request, res: Response) {
        try {
            // validate input
            // DTO responsibility
            const parsedBook = CreateBookDTO.safeParse(req.body);
            // auto validation
            if (!parsedBook.success) {
                return res.status(400).json({ errors: parsedBook.error });
            }
            const { id, title } = parsedBook.data;
            // desstructure
            // const id = parsedBook.data.id;
            // const title = parsedBook.data.title;
            // call service

            const newBook: Book = bookService.createBook({ id, title });
            // { id: id, title: title } // when same variable and key in object
            return res.status(201).json(newBook);
        } catch (error: Error | any) {
            return res.status(500).send(error.message ?? "Internal Server Error");
        }
    }

    getBooks(req: Request, res: Response) {
        const requestedBook: Book[] = bookService.getAllBooks();
        return res.status(200).json(requestedBook);
    }
}