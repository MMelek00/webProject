import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    public token: string;
    private headers: Headers;
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: Http) {
        //append headers
        this.headers = new Headers();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
        
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('user'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<any> {
        let request = JSON.stringify({ email: email, password: password });
        let options = new RequestOptions({ headers: this.headers }); // Create a request option
        return this.http.post(this.apiUrl+'/login', request, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                this.token = response.json().token;
                let email = response.json().email;
                if (this.token) {
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', 
                        JSON.stringify({ email: email, token: this.token }));
                }
                return response;
            });

        /** FAKE login
        this.token = 'token';
        localStorage.setItem('user', JSON.stringify({ email: 'email', token: this.token }));
        return Observable.of(new Object()).mapTo(true);
        */
    }

    register(username: string, email: string, password: string): Observable<any> {
        let request = JSON.stringify({ email: email, name: username, password: password });
        let options = new RequestOptions({ headers: this.headers }); // Create a request option
        return this.http.post(this.apiUrl+'/register', request, options)
            .map((response: Response) => {
                // register successful if there's a jwt token in the response
                this.token = response.json().token;
                let email = response.json().email;
                if (this.token) {
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', 
                        JSON.stringify({ email: email, token: this.token }));
                }
                return response;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('user');
    }

}