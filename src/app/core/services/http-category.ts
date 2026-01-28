import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// El servicio del FrontEnd se habla con el Backend (API)
@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  private base_url: string = 'http://localhost:3000/api/categories';

  // http = inject( HttpClient );    // Inyectar una dependencia en una función

  // Se inyecta como dependencia la clase que permite hacer peticiones
  constructor( private http: HttpClient ) {}

  createCategory( newCategory: any ) : Observable<any> {
    return this.http.post<any>( this.base_url, newCategory );
  }

  getCategories() : Observable<any> {
    return this.http.get<any>( this.base_url );
    // Verificar que estructura de datos envia el BackEnd
    // {
    //   msg: 'Lo que sea',
    //   data: [ data1, data2 ]
    // }
  }
}
