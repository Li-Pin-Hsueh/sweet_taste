import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Product[];
  counter: number[];
  hidden: boolean[];
  totalPrice: number;
  fee = 700;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products) ;
    console.log(this.counter)
  }

  getProducts() {
    this.products = this.cartService.getProducts();
    this.counter = [].constructor(this.products.length).fill(0);
    this.hidden = [].constructor(this.products.length).fill(false);
  }

  increamentCounter(index: number) {
    this.counter[index]++;
  }
  decreamentCounter(index: number) {
    this.counter[index]--;
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.products[i].price * this.counter[i];
    }
    return total;
  }

  getFee(): number {
    let fee = 700;
    if (this.getTotal() > 1000)
      fee = 300;
    else if (this.getTotal() > 500)
      fee = 600;
    else if (this.getTotal() == 0)
      fee = 0;

    this.fee = fee;
    return fee;
  }

  onDelete(index: number) {
    this.products.splice(index, 1);
    this.counter.splice(index, 1);
  }

  sendData() {
    // send data to checkout service
    this.cartService.getCart(this.products, this.counter, this.fee);
  }

}
