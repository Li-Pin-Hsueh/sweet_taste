import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: Product[] = [];
  productsOfTag: Product[];
  displayProducts: Product[];

  selectedTag: String = "all";
  currentPage: number = 0;
  totalPage: number = 0;

  countOfAllProducts = 0;
  countOfDailyProducts = 0;
  countOfHotProducts = 0;
  countOfNewProducts = 0;

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().
      subscribe(products => {
        // console.dir(products);
        this.allProducts = products;

        this.countOfAllProducts = this.allProducts.length;
        this.countOfDailyProducts = this.allProducts
          .filter(product => product.tags.includes('daily')).length;
        this.countOfHotProducts = this.allProducts
          .filter(product => product.tags.includes('hot')).length;
        this.countOfNewProducts = this.allProducts
          .filter(product => product.tags.includes('new')).length;
        this.productsOfTag = this.allProducts;

        if (this.allProducts.length % 4 != 0) this.totalPage = Math.floor(this.allProducts.length / 4) + 1;
        else this.totalPage = Math.floor(this.allProducts.length / 4);

        this.currentPage = 1;

        if (this.totalPage == 1)
          this.displayProducts = this.productsOfTag.slice(0, this.productsOfTag.length);
        else
          this.displayProducts = this.productsOfTag.slice(0, 4);
      });
  }

  onSelect(tag: string): void {
    // change product type
    this.selectedTag = tag;
    this.currentPage = 1;

    // access products of the specific type
    if (tag == 'all') this.productsOfTag = this.allProducts;
    else {
      //this.productService.getProductsByType(type)
      //  .subscribe( products => this.productsOfType = products ) ;
      this.productsOfTag = this.getProductsByTag(tag);
    }

    // refresh display panel
    if (this.productsOfTag.length % 4 != 0) this.totalPage = Math.floor(this.productsOfTag.length / 4) + 1;
    else this.totalPage = Math.floor(this.productsOfTag.length / 4);
    // console.log(this.productsOfType);

    // create a slice of products to show
    if (this.totalPage == 1)
      this.displayProducts = this.productsOfTag.slice(0, this.productsOfTag.length);
    else
      this.displayProducts = this.productsOfTag.slice(0, 4);


  }

  getProductsByTag(tag: string) {

    const products = [];

    return this.allProducts.filter(product =>
      product.tags.includes(tag)
    );

  }

  changePage(p: number) {
    this.currentPage = p;

    // change the data prepared to show
    this.displayProducts = this.productsOfTag.slice((p - 1) * 4, (p - 1) * 4 + 4);
  }

  addToCart(product) {
    //TODO
    //this.cartService.addToCart(product) ;
  }


}
