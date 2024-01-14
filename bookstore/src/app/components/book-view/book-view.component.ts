
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreHeaderComponent } from '../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../shared/models/book';
import { books } from '../../shared/books';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
// import { SwiperComponent } from "swiper/angular";
import { SwiperModule } from 'swiper/angular';
import Swiper from "swiper";

// import Swiper core and required components


@Component({
    selector: 'bs-book-view',
    standalone: true,
    imports: [CommonModule,
        BookStoreHeaderComponent,
        MatIconModule,
        BookStoreStarRatingComponent,
        SwiperModule],
    templateUrl: './book-view.component.html',
})
export class BookStoreBookViewComponent {
    book: Book | undefined = new Book();
    books: Book[] = [];

    constructor(private route: ActivatedRoute) {
        const bookIsbn = this.route.snapshot.paramMap.get('bookIsbn');

        this.books = books.filter(book => book != this.book);
        this.book = books.find(book => book.isbn === bookIsbn);
        console.log("this.book", this.route.snapshot.paramMap);

        this.book!['year'] = new Date(this.book?.published!)?.getFullYear()!;

        // var swiper = new Swiper('.swiper', {
        //     'direction': 'horizontal'
        //  });
    }


    navigateToBookView(book: Book) {
        console.log("b", book);
        //this.router.navigate(['/category', {bookIsbn: book.isbn}])
        this.book = book;
        this.books = books.filter(book => book != this.book);
    }
}
