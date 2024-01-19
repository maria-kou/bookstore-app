
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookStoreHeaderComponent } from '../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { BookStoreStarRatingComponent } from '../../shared/components/star-rating/star-rating.component';
import { BooksService } from '../../services/books.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Book } from '../../shared/models/book';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
    selector: 'bs-book-form',
    standalone: true,
    imports: [CommonModule,
        BookStoreHeaderComponent,
        MatIconModule,
        BookStoreStarRatingComponent,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatRippleModule
    ],
    templateUrl: './book-form.component.html',
})
export class BookStoreBookFormComponent {
    formGroup: FormGroup;
    submitted: boolean = false;
    //File Upload
    @ViewChild('fileInput') el: ElementRef;
    imageUrl: any = "";
    editFile: boolean = true;
    removeUpload: boolean = false;

    get form() { return this.formGroup.controls};

    constructor(private fb: FormBuilder,
        private service: BooksService,
        private _snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            imageUrl: new FormControl(""),
            isbn: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{13}$')]),
            isbn10: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
            title: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern('^[ A-Za-z@”#&*!]*$')]),
            description: new FormControl("", [Validators.required, Validators.maxLength(512), Validators.pattern('^[A-Z][a-zA-Z\\s]*$')]),
            author: new FormControl("", Validators.required),
            secondAuthor: new FormControl(""),
            thirdAuthor: new FormControl(""),
            publisher: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
            pages: new FormControl("", [Validators.required, Validators.max(9999), Validators.pattern('^[0-9]*$')]), 
            categories: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+(?:,[a-zA-Z0-9 ]+){0,3}$')]),            
            rating: new FormControl("", [Validators.max(5), Validators.pattern('^[0-9]{1}$')]),
            year: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{4}$')]),
        })

    }


    onSubmit() {
        this.submitted = true;
        
        if (!this.formGroup.valid) {
            return;
        }

        let data = this.formGroup.value;
        data.categories = data.categories.split(/\s*,\s*/);
        data.published = new Date(data.year!).toISOString();
               
        let newBook = new Book();
        newBook = data;
        this.service.createBook(newBook);
        this.openSnackBar();
     }

    uploadFile(event: any) {
        
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            // When file uploads set it to file formcontrol
            reader.onload = () => {
                this.imageUrl = reader.result;
                this.formGroup.patchValue({
                    imageUrl: reader.result
                });
                this.editFile = false;
                this.removeUpload = true;

                
            }
        }
    }

    resetForm() {
        this.formGroup.reset();
    }

    openSnackBar() {
        this._snackBar.open('The book is saved!', '', {duration: 3000});
      }

}


