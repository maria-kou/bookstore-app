import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from  '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'bs-star-rating',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule],
  template: `
  <button mat-icon-button [color]="'primary'" *ngFor="let ratingId of ratingArr; index as i" [id]="'star_'+i"
      (click)="onClick(i+1)" [matTooltip]="ratingId+1" matTooltipPosition="above">
      <mat-icon>
          {{showIcon(i)}}
      </mat-icon>
  </button>
  `
})
export class BookStoreStarRatingComponent {
    @Input() rating: number = 3;
    @Input() starCount: number = 5;
    @Output() ratingUpdated = new EventEmitter();
  
    private snackBarDuration: number = 2000;
    ratingArr: any[] = [];
  
    constructor(private snackBar: MatSnackBar) {
    }
  
  
    ngOnInit() {
      console.log("a "+this.starCount)
      for (let index: number = 0; index < this.starCount; index++) {
        this.ratingArr.push(index);
      }
    }
    onClick(rating:number) {
      console.log(rating)
      this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
        duration: this.snackBarDuration
      });
      this.rating = rating;
      this.ratingUpdated.emit(rating);
      return false;
    }
  
    showIcon(index:number) {
      if (this.rating >= index + 1) {
        return 'star';
      } else {
        return 'star_border';
      }
    }
}
