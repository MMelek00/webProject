import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Book } from '../_models/book.model';

@Injectable()
export class BooksService {

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

  getBooks(page=1): Observable<any> {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.get(this.apiUrl+'/books', options)
        .map((response: Response) => {
            return response;
        });

    /*
    return Observable.of(new Object()).mapTo(
  	  { 
  	  	"notes": 
  	  	  [
		  	{
		  		"id": 1,
		  		"content": 'Book 1'
		  	},
		  	{
		  		"id": 2,
		  		"content": 'Book 2'
		  	},
  	      ],
  	  	"pages": "5"
  	  }
  	);
    */
  }

  addBook(): Observable<any> {
    let request = JSON.stringify({ content: "" });
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.post(this.apiUrl+'/books', request, options)
        .map((response: Response) => {
            return response;
        });
    /*
    return Observable.of(new Object()).mapTo(
  	  { 
		  	"id": 0,
		  	"content": 'New Book'
  	  }
  	);
    */
  }

  deleteBook(id: number) {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.delete(this.apiUrl+'/books/'+id, options)
        .map((response: Response) => {
            return response;
        });
    //return Observable.of(new Object()).mapTo(true);
  }

  updateBook(id: number, title: string, cover: string, date: string) {
    let request = JSON.stringify({ title: title,cover: cover,date: date });
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.put(this.apiUrl+'/books/'+id, request, options)
        .map((response: Response) => {
            return response;
        });
    //return Observable.of(new Object()).mapTo(true);
  }

}
