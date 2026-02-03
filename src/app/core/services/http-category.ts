import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Category } from '../interfaces/category';
import { ResponseCategory } from '../interfaces/response-category';
import { environment } from '../../../environments/environment';

// El servicio del FrontEnd se habla con el Backend (API)
@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = environment.baseUrl;
  private slug: string = 'categories';

  // http = inject( HttpClient );    // Inyectar una dependencia en una función

  // Se inyecta como dependencia la clase que permite hacer peticiones
  constructor( private http: HttpClient ) {}

  createCategory( newCategory: Partial<Category> ) : Observable<Category> {
    return this.http.post<Category>( `${ this.base_url }/${ this.slug }`, newCategory );
  }

  // Tipado nativo de TypeScript ==> Category[]
  // Tipado de Java              ==> Array<Category>

  getCategories() : Observable<Category[]> {
    return this.http.get<ResponseCategory>( `${ this.base_url }/${ this.slug }` )
      .pipe(
        tap( data => console.info( data )),
        map( resp => resp.categories ),     // Extraer el arreglo de categorias
        catchError( err => of([]))
      )
    // Verificar que estructura de datos envia el BackEnd
    // {
    //   msg: 'Lo que sea',
    //   data: [ data1, data2 ]
    // }
  }

  deleteCategoryById( id: string ): Observable<Category> {
    return this.http.delete<Category>( `${ this.base_url }/${ this.slug }/${id}` );
  }

  getCategoryById( id: string ): Observable<Category> {
    return this.http.get<Category>( `${ this.base_url }/${ this.slug }/${id}` );
  }

  updateCategoryById( id: string | null, updatedCategory: Category ): Observable<Category> {
    return this.http.patch<Category>(`${ this.base_url }/${ this.slug }/${id}`, updatedCategory );
  }
}
