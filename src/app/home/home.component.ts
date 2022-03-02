import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from 'src/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  books: any;
  filters = {
    fechaIni: '1920-01-01',
    fechaFin: '2022-12-31',
    Autor: null,
  };

  constructor(public bookService: BooksService, public router: Router) {}

  ngOnInit() {
    this.getBooks(this.filters);
  }

  filterChanged(filters: any) {
    Object.keys(filters).forEach((key) => {
      if (!filters[key] || typeof filters[key] !== 'string') {
        delete filters[key];
      }
    });
    this.filters = filters;

    this.getBooks(this.filters);
  }

  getBooks(filter: any) {
    this.bookService.get(filter).subscribe((books) => {
      this.books = books;
    });
  }
}
