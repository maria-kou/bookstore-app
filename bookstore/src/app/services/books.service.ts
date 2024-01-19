import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Book } from "../shared/models/book";
import { books as savedBooks } from "../shared/books";

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    books = new BehaviorSubject<Book[]>(savedBooks);
 
    createBook(newBook: Book) {
        const updatedValue = [newBook, ...this.books.value];
        this.books.next(updatedValue);
    }
}