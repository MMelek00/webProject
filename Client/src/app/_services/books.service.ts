import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Book } from '../_models/book.model';

@Injectable()
export class BookService {
  
  public token: string;
  private headers: Headers;
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: Http) { 
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('user'));
    this.token = currentUser && currentUser.token;

    //append headers
    this.headers = new Headers({ 'Authorization': this.token, 'Content-Type': 'application/json' });
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
  }


  searchBooks(book: Book, page=1): Observable<any> {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    let url = this.apiUrl+'/book?favorite=0';
    if(book.title)
      url += '&title='+book.title;
    if(book.cover)
      url += '&cover='+book.cover;
    if(book.date)
      url += '&date='+book.date;
    return this.http.get(url, options)
        .map((response: Response) => {
            return response;
        });
  }

  /* FAKE search
  searchBooks(book: Book, page=1){
  	return Observable.of(new Object()).mapTo(
  	  { 
  	  	"books": 
  	  	  [
		  	{
		  		"id": 1,
		  		"name": 'Book 1',
		  		"boosters": '0',
		  		"date": '0',
		  		"active": false,
		  		"favorite": true
		  	},
		  	{
		  		"id": 2,
		  		"name": 'Book 2',
		  		"boosters": 1,
		  		"date": 13,
		  		"active": true,
		  		"favorite": false
		  	},
  	      ],
  	  	"pages": "5"
  	  }
  	);
  }
  */

  favoriteBooks(page=1): Observable<any> {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    let url = this.apiUrl+'/book?favorite=1';
    return this.http.get(url, options)
        .map((response: Response) => {
            return response;
        });
    //return this.searchBooks(new Book(), page);
  }


  chageFavoriteStatus(id): Observable<any> {
  	let options = new RequestOptions({ headers: this.headers }); // Create a request option
    let request = JSON.stringify({ book_id: id });
    let url = this.apiUrl+'/book';
    return this.http.post(url, request, options)
        .map((response: Response) => {
            return response;
        });
    //return Observable.of(new Object()).mapTo(true);
  }

}
