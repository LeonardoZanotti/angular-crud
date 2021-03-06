import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'    // root -> tá on pra td que chamar o serviço
})

export class ProductService {

  baseUrl = 'http://localhost:3001/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  store(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);  // this.baseUrl + '?_page=' + page + '&_limit=' + limit
                                                    // https://github.com/typicode/json-server#paginate
  }

                                // Fazer localhost:4200/site pra mostrar os produtos listados com preço, página com detalhes e botão de adi-
                                // cionar ao carrinho, fazer página de carrinho também
                                // https://angular.io/start

                                // importar uma fonte diferente e mudar no css o font-family
                                // Mudar o títulozinho que tem no canto superior esquerdo quando muda de página
                                // deixar tudo responsivo -> bootstrap
                                // modal de delete
                                // conseguir executar os testes com o jasmine e resolver o que tem de errado
                          // https://www.itsolutionstuff.com/post/angular-call-component-method-from-another-component-exampleexample.html
                          // https://medium.com/@hasangalakdinu/how-to-call-a-function-in-another-component-angular-using-rxjs-3f2e85920705

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.delete<Product>(url);
  }
}
