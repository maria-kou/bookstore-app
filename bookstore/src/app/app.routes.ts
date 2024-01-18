import { Routes } from '@angular/router';
import { BookStoreSearchComponent } from './components/search/search.component';
import { BookStoreBookViewComponent } from './components/book-view/book-view.component';
import { BookStoreBookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },

    { path: 'search', component: BookStoreSearchComponent }, 

    { path: 'category', component: BookStoreBookViewComponent },
    
    { path: 'add', component: BookStoreBookFormComponent },
];
