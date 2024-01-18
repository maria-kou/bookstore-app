import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Book } from "../shared/models/book";
import { books as savedBooks } from "../shared/books";

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    books = new BehaviorSubject<Book[]>([]);


    getBooks() {
       
        let storageBook = JSON.parse(localStorage.getItem('books')!) ?? [];
        const books: Book[] = [...storageBook, ...savedBooks];

        this.books.next(books);


    }

    setBooks() {
       // this.books.next(savedBooks);
    }

    createBook(newBook: Book) {
        console.log("newBook", newBook);
       

        const currentValue: Book[] = this.books.value;
        const updatedValue = [newBook, ...this.books.value];
        this.books.next(updatedValue);
        console.log("this.books.value", this.books.value);
        localStorage.setItem('books', JSON.stringify(updatedValue));
    }
}