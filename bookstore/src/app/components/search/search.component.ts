
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
    value: any = '';
    books: Book[] = books;
    resultBooks: Book[] = books;
    bookCategories: string[] = [];
    bookPublishedYears: number[] = [];


    selectedCategory: string;
    selectedYear: number;
    filteredBooks: Book[] = [];

    constructor(private router: Router) {
        let categories: any[] = [];
        let years: number[] = [];

        this.books.forEach(book => {
            categories.push(book.category);
            years.push(new Date(book.published).getFullYear())
        })

        this.bookCategories = [...new Set(categories)];
        this.bookPublishedYears = [...new Set(years)].sort(function (a, b) { return a - b });

    }

    search(term: string) {
        //this.filteredBooks = [];

        this.resultBooks = [];
        const data = this.filteredBooks ?? this.books;
        if (term != '') {
            data.forEach(item => {
                let match = item.title.toLowerCase().includes(term.toLowerCase());
                if (match) {
                    this.resultBooks.push(item);
                }
            })
            //return this.resultBooks;
        } else {
            this.resultBooks = this.books;
        }

        console.log("this.selectedYear", this.selectedYear);
        // if (this.selectedYear) {
            this.onYearChange(this.selectedYear);
        // }
       
        // if (this.selectedCategory) {
            this.onCategoryChange(this.selectedCategory);
        // }
        

    }


    onCategoryChange(selectedCategory: string) {

        if (selectedCategory) {
            this.filteredBooks = this.resultBooks.filter(book => book.category === selectedCategory);
        } else if (selectedCategory == 'empty') {
            this.filteredBooks = this.resultBooks;
        }

    }

    onYearChange(selectedYear: number | string) {
        if (selectedYear) {
            this.filteredBooks = this.resultBooks.filter(book => new Date(book.published).getFullYear() === selectedYear);
        } else if (selectedYear == 'empty') {
            this.filteredBooks = this.resultBooks;
        }

    }

    navigateToBookView(book: Book) {
        console.log("b", book);
        this.router.navigate(['/category', {bookIsbn: book.isbn}])
    }
}
