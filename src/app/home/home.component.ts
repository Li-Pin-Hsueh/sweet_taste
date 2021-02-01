import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from "../product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedType : string = '' ;
  displayProducts : Product[] = [];

  constructor(public productService : ProductService) { }

  ngOnInit(): void {
    //this.productService.getProducts().subscribe();
    this.productService.ngOnInit();

  }

  getTopProducts( type: string ) : void {
    const allProducts = this.productService.products ;
    let count = 0 ;

    this.selectedType = type ;
    this.displayProducts = [];

    for( let index=0; index < allProducts.length ; index ++){
      if( allProducts[index].tags.includes(type) ){
        this.displayProducts.push(allProducts[index]) ;
        count ++ ;
        if(count == 3) break ;
      }
    }


    //console.log(this.topProducts) ;
  }

  addToCart(product) {
    //TODO
    //this.cartService.addToCart(product) ;
  }

}
