import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { BooksService } from '../../../_services/book.service';
import { Book } from '../../../_models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() id: number;
  @Input() title: string;
  @Input() cover: string;
  @Input() date: string;

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<Book> = new EventEmitter<Book>();
  

  constructor(private BooksService: BooksService) {
    this.title = "",
    this.cover = "",
    this.date = "",
    this.id = 0;
  }

  ngOnInit() {
  }

  onUpdateNote() {
    this.BooksService.updateBook(this.id, this.title,this.cover,this.date)
      .subscribe(res => {
        let book = new Book();
        book.id = this.id;
        book.title = this.title;
        book.cover = this.cover;
        book.date = this.date;

        this.update.emit(book);
      }, error => {
        console.error(error);
      });
  }

  onDeleteNote() {
  	this.BooksService.deleteBook(this.id)
      .subscribe(res => {
        this.delete.emit(this.id);
      }, error => {
        console.error(error);
      });
  }

}
