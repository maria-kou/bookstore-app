
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreHeaderComponent } from '../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../shared/models/book';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { SwiperModule } from 'swiper/angular';
import { BooksService } from '../../services/books.service';



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
    bookIsbn: string = '';

    constructor(private route: ActivatedRoute, private router: Router, private service: BooksService) {

        this.service.books.subscribe(data => {
            if (data) {

                this.books = data;
            }
        })

        this.route.params.subscribe(params => {
            this.bookIsbn = params['bookIsbn'];

            this.book = this.books.find(book => book.isbn === this.bookIsbn);
            this.book!['year'] = new Date(this.book?.published!)?.getFullYear()!;
            this.books = this.books.filter(book => book != this.book);
        });
    }

    ngOnInit() {

    }


    selectBook(book: Book) {
       
        this.router.navigate(['/category', { bookIsbn: book.isbn }]);
    }
}
