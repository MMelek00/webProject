import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../_models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  book: Book;
  reloading: boolean;

  constructor(private router: Router, private cd: ChangeDetectorRef) { 
	this.book = new Book();
  	this.reloading = false;
  }

  ngOnInit() {
  }

  onSearch(){
  	this.reloading = true;
  	this.cd.detectChanges();
  	this.reloading = false;
  	this.cd.detectChanges();
    this.cd.markForCheck();
  }

}
