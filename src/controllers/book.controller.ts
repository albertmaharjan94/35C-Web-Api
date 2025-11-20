import { Request, Response } from "express";
import { z } from "zod";

export const BookSchema = z.object({
    id: z.string().min(1, { message: "ID is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    date: z.string().optional()
});
export type Book = z.infer<typeof BookSchema>;

// DTO - Data Transfer Object
// Input/Output structure
export const CreateBookDTO = BookSchema.pick({ id: true, title: true });
export type CreateBookDTO = z.infer<typeof CreateBookDTO>;

 
// export type Book = {
//     id: string,
//     title: string,
//     date?: string
// }
let books: Book[] = [
    { id: 'B-1', title: 'Harry potter' },
    { id: 'B-2', title: 'Lord of the rings', date: '29-05-2001' }
];

export class BookController {
    createBook(req: Request, res: Response) {
        const parsedBook = CreateBookDTO.safeParse(req.body);
        // auto validation
        if(!parsedBook.success){
            return res.status(400).json({ errors: parsedBook.error });
        }
        const { id, title } = parsedBook.data;
        // const { id, title} = req.body; // destructure
        // let example = {
        //     id: 'B-3'
        // }
        // const { id } = example; // id = 'B-3' // 
        // const id = example.id; // same as above

        // if(!title){
        //     return res.status(400).json({ message: "Title is required" });
        // }
        // if(!id){
        //     return res.status(400).json({ message: "ID is required" });
        // }
        
        const checkId: boolean = books.some((book) => book.id === id);
        if(checkId){
            return res.status(409).json({ message: "Book ID already exists" });
        }
        const newBook: Book = { id, title };
        // if same key and variable eg: { id: id, title: title }
        books.push(newBook);
        return res.status(201).json(newBook);
    }

    getBooks(req: Request, res: Response) {
        const requsetedBook: Book[] = books
        return res.status(200).json(requsetedBook);
    }
}