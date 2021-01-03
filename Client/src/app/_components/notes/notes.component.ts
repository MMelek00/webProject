import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BookService } from '../../_services/note.service';
import  { AuthenticationService } from '../../_services/authentication.service';
import { Book } from '../../_models/book.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [ BookService ]
})
export class NotesComponent implements OnInit {

  @Input() id: number;
  @Output() onLoad: EventEmitter<number> = new EventEmitter<number>();
  public books: Array<any>;
  public currentPage: number;
  public maxPages: number;

  constructor(
    private noteService: BookService, 
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
    this.noteService.getBooks(page)
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
    this.noteService.addBook()
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
        this.books[i].content = event.content;
        break;
      }
    }
  }

}
