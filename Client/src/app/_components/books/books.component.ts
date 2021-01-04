import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BooksService } from '../../_services/book.service';
import  { AuthenticationService } from '../../_services/authentication.service';
import { Book } from '../../_models/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [ BooksService ]
})
export class BooksComponent implements OnInit {

  @Input() id: number;
  @Output() onLoad: EventEmitter<number> = new EventEmitter<number>();
  public books: Array<any>;
  public currentPage: number;
  public maxPages: number;

  constructor(
    private BooksService: BooksService, 
    private authService: AuthenticationService
  ) {
    this.books = [];
    this.currentPage = 1;
    this.maxPages = 1;
  }

  ngOnInit() {
    this.getNotes();  
  }

  onLoadMore() {
    this.currentPage++;
    this.getNotes(this.currentPage);
  }

  getNotes(page=1){
    this.BooksService.getBooks(page)
	    .subscribe(res => {
        let books = JSON.parse(res._body);
        if(books.length != 0) {
          this.books = books;
        }
        this.onLoad.emit(this.books.length);
	    }, error => {
	      console.error(error);
	    });
  }

  onAddBook() {
    this.BooksService.addBook()
      .subscribe(res => {
        this.books.push(new Book());
        this.onLoad.emit(this.books.length);
        this.getNotes();
      }, error => {
        console.error(error);
      });
  }

  deleteBook(event) {
    for(let i = 0; i < this.books.length; i++){
      if(this.books[i].id == +event) {
        this.books.splice(i, 1);
        break;
      }
    }
  }

  updateBook(event) {
    for(let i = 0; i < this.books.length; i++){
      if(this.books[i].id == event.id) {
        this.books[i].title = event.title;
        break;
      }
    }
  }

}
