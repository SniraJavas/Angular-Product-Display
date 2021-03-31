import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'https://localhost:44385/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  
};

export interface Product {
    productsID: number,
    productCode: string,
    productDescriptionOriginal: string,
    productDescription: string,
    productCategory: string,
    productStatus: string,
    productBarcode: string,
    rowchecksum: string
}

@Injectable({
  providedIn: 'root',
})


export class RestService {
  constructor(private http: HttpClient) {
    http.options("*",)
  }

  private extractData(res: any): any {
    const body = res;
    return body || { };
  }

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'products').pipe(map(this.extractData),
      catchError(this.handleError)
    );
  }

  getProduct( ProductsID: number): Observable<any> {
    console.log("getByID Product id ", ProductsID);
    return this.http.get(endpoint + 'products/' + ProductsID).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addProduct (product: { productsID: number; productCode: string; productDescriptionOriginal: string; productDescription: string; productCategory: string; productStatus: string; productBarcode: string; rowchecksum: string; }): Observable<any> {
    console.log("Product to Add", product);
    return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError)
    );
  }

  updateProduct ( ProductsID: number, product: Product): Observable<any> {
    console.log("product to update ID ",ProductsID );
    return this.http.put(endpoint + 'products/' + ProductsID, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${ProductsID}`)),
      catchError(this.handleError)
    );
  }

  deleteProduct ( ProductsID: number): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + ProductsID, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${ProductsID}`)),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
