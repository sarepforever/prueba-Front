import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-books-filtering',
  templateUrl: './books-filtering.component.html',
  styleUrls: ['./books-filtering.component.scss'],
})
export class BooksFilteringComponent {
  @Output() filterChanged: EventEmitter<any> = new EventEmitter();
  autor?: string;
  from: any = new Date();
  to: any = new Date();

  filtrar() {
    this.filterChanged.emit({
      Autor: this.autor,
      fechaIni: this.from,
      fechaFin: this.to,
    });
  }
}
