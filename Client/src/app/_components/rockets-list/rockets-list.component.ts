import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BookService } from '../../_services/books.service';
import  { AuthenticationService } from '../../_services/authentication.service';
import { Book } from '../../_models/book.model';

@Component({
  selector: 'app-rockets-list',
  templateUrl: './rockets-list.component.html',
  styleUrls: ['./rockets-list.component.scss'],
  providers: [ BookService ]
})
export class RocketsListComponent implements OnInit {

  @Input() type: string;
  @Input() searchModel: Book;
  @Input() id: number;
  @Output() onLoad: EventEmitter<number> = new EventEmitter<number>();
  public books: Array<any>;
  public currentPage: number;
  public maxPages: number;

  constructor(
    private bookService: BookService, 
    private authService: AuthenticationService
  ) {
    this.type = "search";
    this.books = [];
    this.currentPage = 1;
    this.maxPages = 1;
  }

  ngOnInit() {
    this.getRockets();  
  }

  onLoadMore() {
    this.currentPage++;
    this.getRockets(this.currentPage);
  }

  getRockets(page=1){
    switch(this.type) {
      case "search": {
        this.bookService.searchBooks(this.searchModel, page)
          .subscribe(response => {
            let books = JSON.parse(response._body);
            let len = books.length;
            for(let i=0; i<len; i++) {
              let rocket = new Book();
              rocket.id = books[i].id;
              rocket.title = books[i].title;
              rocket.cover = books[i].cover;
              rocket.date = books[i].date;
            
              this.books.push(rocket);
            }
            this.onLoad.emit(this.books.length);
          }, error => {
            console.error(error);
          });
        break;
      }
      case "favorite": {
        this.bookService.favoriteBooks(page)
          .subscribe(response => {
            let books = JSON.parse(response._body);
            let len = books.length;
            for(let i=0; i<len; i++) {
              let rocket = new Book();
              rocket.id = books[i].id;
              rocket.title = books[i].title;
              rocket.cover = books[i].cover;
              rocket.date = books[i].date;
              this.books.push(rocket);
            }
            this.onLoad.emit(this.books.length);
          }, error => {
            console.error(error);
          });
        break;
      }
    }
  }

}
