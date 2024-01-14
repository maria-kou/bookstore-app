import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'bs-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
      <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
              <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  href="#pablo">
                  {{title}}
              </a>
              <button
                  class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button" (click)="toggleNavbar()">
                  <mat-icon>menu</mat-icon>
              </button>
          </div>
          <div [ngClass]="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
              <ul class="flex flex-col lg:flex-row list-none ml-auto">
                  <li class="nav-item">
                      <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          href="/search">
                          <mat-icon class="text-white opacity-75">search</mat-icon>
                          <span class="ml-2">Search Books</span>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                          href="#pablo">
                          <mat-icon class="text-white opacity-75">add</mat-icon><span
                              class="ml-2">Create a Book</span>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
  `
})
export class BookStoreHeaderComponent {
  title = 'Bookstore';

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
