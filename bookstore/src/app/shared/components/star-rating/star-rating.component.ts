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
  <div  class="flex flex-row">
    <div class="text-black" *ngFor="let ratingId of ratingArr; index as i" [id]="'star_'+i">
      <mat-icon>
        {{showIcon(i)}}
      </mat-icon>
    </div>
  </div>
  `
})
export class BookStoreStarRatingComponent {
    @Input() rating: number  = 3;
    @Input() starCount: number = 5;
    
    ratingArr: any[] = [];
  
    constructor(private snackBar: MatSnackBar) {
    }
  
  
    ngOnInit() {
      
      for (let index: number = 0; index < this.starCount; index++) {
        this.ratingArr.push(index);
      }
    }
  
    showIcon(index:number) {
      if (this.rating >= index + 1) {
        return 'star';
      } else {
        return 'star_border';
      }
    }
}
