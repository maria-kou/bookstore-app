import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { Book } from '../../shared/models/book';


@Component({
  selector: 'bs-book-results',
  standalone: true,
  imports: [CommonModule, BookStoreStarRatingComponent],
  template: `
  <div class="w-full flex flex-row flex-wrap gap-[64px]">
      @for (book of data; track book.isbn) {
      <div class="flex flex-col gap-2 w-[240px]" (click)="selectBook(book)">
          <div class=" h-[260px] bg-gray-50 rounded flex flex-col items-center justify-center">
              <!-- <img/> -->
              <span class="opacity-25">Image</span>
          </div>

          <div class="text-center">{{book.title}}</div>
          <bs-star-rating></bs-star-rating>
      </div>
      }
  </div>
  `
})
export class BookStoreStarBookResultsComponent {
    @Input() data: Book[] = [];

    @Output()  onBookClick = new EventEmitter();
  
  
    constructor() {
    }
  
  
    ngOnInit() {
        console.log("data", this.data);
    }

    selectBook(book: Book) {
        this.onBookClick.emit(book);
    }
  
}
