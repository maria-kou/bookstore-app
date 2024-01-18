
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreHeaderComponent } from '../../shared/components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { books } from '../../shared/books';
import { Book } from '../../shared/models/book';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { BookStoreStarBookResultsComponent } from './search-book-results.component';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
    selector: 'bs-search',
    standalone: true,
    imports: [CommonModule,
        BookStoreHeaderComponent,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        BookStoreStarRatingComponent,
        BookStoreStarBookResultsComponent],
    templateUrl: './search.component.html',
})
export class BookStoreSearchComponent {

    books: Book[] = [];
    resultBooks: Book[] = [];
    bookCategories: string[] = [];
    bookPublishedYears: number[] = [];

    searchTerm: any = '';
    selectedCategory: string;
    selectedYear: number;



    constructor(private router: Router, private service: BooksService) {
        
        this.service.getBooks();
    }

    ngOnInit() {
        this.service.books.subscribe(data => {
            if (data) {
                this.books = data;
                
                this.resultBooks = data;

                let categories: any[] = [];
                let years: number[] = [];

                this.books.forEach(book => {
                    book.categories?.forEach(c => categories.push(c.toLowerCase()));
                    years.push(new Date(book.published).getFullYear());
                })

                this.bookCategories = [...new Set(categories)];
                
                this.bookPublishedYears = [...new Set(years)].sort(function (a, b) { return a - b });
            }
        })
    }

    search(term: string) {
        this.filterArray();
    }


    onCategoryChange(selectedCategory: string) {
        this.filterArray();
    }

    onYearChange(selectedYear: number) {
        this.filterArray();
    }

    filterArray() {
        this.resultBooks = [];
        if (this.searchTerm != '') {
            this.books.forEach(item => {
                let match = item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
                if (match) {
                    this.resultBooks.push(item);
                }
            })
        } else {
            this.resultBooks = this.books;
        }

        if (this.selectedYear) {
            this.resultBooks = this.resultBooks.filter(book => new Date(book.published).getFullYear() === this.selectedYear);
        }

        if (this.selectedCategory) {
            this.resultBooks = this.resultBooks.filter(book => book.categories?.find(c => c === this.selectedCategory));

        }
    }

    navigateToBookView(book: Book) {
        this.router.navigate(['/category', { bookIsbn: book.isbn }])
    }
}
