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

 
    createBook(newBook: Book) {
        const updatedValue = [newBook, ...this.books.value];
        this.books.next(updatedValue);
        
        localStorage.setItem('books', JSON.stringify(updatedValue));
    }
}