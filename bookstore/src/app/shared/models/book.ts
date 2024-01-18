export class Book {
    isbn: string;
    isbn10?: string;
    title: string;
    subtitle: string;
    author: string;
    secondAuthor?: string;
    thirdAuthor?: string;
    published: string;
    publisher: string;
    pages: number;
    description: string;
    website: string; 
    categories: Array<string>;
    imageUrl?: string;
    rating?: number;
    year?: number;
}