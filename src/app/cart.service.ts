import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products = [];
  counter = [];
  transportFee = 0;
  name = '';
  phoneNumber = '';
  address = '';
  postData = {};

  constructor(private http: HttpClient) { }

  addToCart(product) {

    if (this.products.find(p => p.id == product.id)) {
      alert("Product have been in the cart.")
    }
    else {
      this.products.push(product);
    }

    console.log(this.products.length);
  }

  getProducts() {
    return this.products;
  }

  getCounter() {
    return this.counter;
  }

  getCart(p: Product[], c: number[], f: number) {
    this.products = p;
    this.counter = c;
    this.transportFee = f;
  }

  enpacData(data: any) {
    // enpacsulation data for POST
    // TODO
    const name = data['lastName'] + data['firstName'];
    const address = data['city'] + data['dist'] + data['address'];
    const phoneNumber = data['phoneNumber'];
    const totalPrice = this.getTotalPrice();
    let productsToBuy = [];

    for (let i = 0; i < this.products.length; i++) {
      let productInfo = {};
      productInfo['id'] = this.products[i].id;
      productInfo['amount'] = this.counter[i];
      productsToBuy.push(productInfo);
    }

    this.postData['productsToBuy'] = productsToBuy;
    this.postData['totalPrice'] = totalPrice;
    this.postData['name'] = name;
    this.postData['address'] = address;
    this.postData['phoneNumber'] = phoneNumber;
    this.post(this.postData);
  }

  getPrice() {

    let price = 0;

    for (let i = 0; i < this.products.length; i++) {
      price += this.products[i].price * this.counter[i];
    }
    //console.log(price);
    return price;
  }
  
  getTotalPrice() {
    let totalPrice = this.getPrice() + this.transportFee;
    //console.log("Total Price: ", totalPrice) ;
    return totalPrice;
  }

  post(data) {
    this.http.post('http://localhost:8080/checkout', data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    console.log(data);
  }
}
