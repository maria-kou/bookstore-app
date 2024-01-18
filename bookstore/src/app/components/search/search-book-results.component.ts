import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { Book } from '../../shared/models/book';


@Component({
  selector: 'bs-book-results',
  standalone: true,
  imports: [CommonModule, BookStoreStarRatingComponent],
  template: `
  <div class="w-full flex flex-row flex-wrap gap-[64px] justify-center">
      @for (book of data; track book.isbn) {
      <div class="flex flex-col gap-2 w-[240px] cursor-pointer" (click)="selectBook(book)">
          <div class=" h-[260px] bg-gray-50 rounded flex flex-col items-center justify-center">
              <!-- <img/> -->
              @if(book?.imageUrl) {
                <div class="w-full h-full bg-cover bg-no-repeat bg-center" id="imagePreview"
                                [style.backgroundImage]="'url('+ book.imageUrl +')'">
                </div>
              } @else {
                <span class="opacity-25">Image</span>
              }
          </div>

          <div class="text-center">{{book?.title}}</div>
          <bs-star-rating [rating]="book?.rating ?? 0"></bs-star-rating>
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
    }

    selectBook(book: Book) {
        this.onBookClick.emit(book);
    }
  
}
