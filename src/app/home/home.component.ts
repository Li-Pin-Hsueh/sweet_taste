import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from "../product";
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts : Product[] = [] ;
  selectedTag : string = '' ;
  displayProducts : Product[] = [];

  constructor(private productService : ProductService, private cartService : CartService) { }

  ngOnInit(): void {

    //this.productService.ngOnInit();
    this.productService.getProducts().subscribe((p) => {
      this.allProducts = p;
      this.getTopProducts('daily');
    }
    );
  }

  getTopProducts( type: string ) : void {
    const allProducts = this.allProducts ;
    let count = 0 ;

    this.selectedTag = type ;
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
    
    this.cartService.addToCart(product) ;
  }

}
