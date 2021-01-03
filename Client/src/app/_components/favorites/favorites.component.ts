import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../_models/book.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  book: Book;

  constructor() { 
	this.book = new Book();
  }

  ngOnInit() {
  }

}
