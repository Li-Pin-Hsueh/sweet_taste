import { Injectable, OnInit } from '@angular/core';
import { Product } from "./product";
import { Observable, of, throwError } from 'rxjs';
// httpclient
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit{

  private baseUrl = 'http://localhost:8080/api/';  // URL to web api

  products : Product[] = [] ;

  constructor( private http: HttpClient ) { }

  ngOnInit() {

    // init products
    this.getProducts().subscribe(
      p => this.products = p
    );
  }

  // GET from "api/home"
  getProducts(): Observable<Product[]> {

    const url = this.baseUrl + "home";
    console.log("READ data...");
    return this.http.get<Product[]>(url, { responseType: 'json' });

  }

}
