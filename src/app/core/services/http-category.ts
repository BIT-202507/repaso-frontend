import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCategory {
  // http = inject( HttpClient );    // Inyectar una dependencia en una función

  // Se inyecta como dependencia la clase que permite hacer peticiones
  constructor( private http: HttpClient ) {}

  createCategory( newCategory: any ) {
    return this.http.post( 'http://localhost:3000/api/categories', newCategory );
  }
}
