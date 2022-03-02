import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ExportService } from 'src/services/export.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  @Input() books: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient, private excelService : ExportService) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.httpClient.get<any[]>('data/data.json')
      .subscribe(data => {
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      }, err => this.dtTrigger.next());
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.books, 'books');
  }
}