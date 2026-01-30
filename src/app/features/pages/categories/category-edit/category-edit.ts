import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

import { HttpCategory } from '../../../../core/services/http-category';

@Component({
  selector: 'app-category-edit',
  imports: [],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEdit {
  categoryId!: string | null;     // Guardar el ID que viene en la ruta

  constructor(
    private activatedRoute: ActivatedRoute,   // Dependencia que tiene la informacion sobre la ruta activa
    private httpCategory: HttpCategory
  ) {}

  ngOnInit() {
    // Paso 1: Obtener el ID que ha sido enviado en la ruta
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.categoryId);

    // Validar viene un id de la ruta, para cargar los datos de la categoria por ese ID
    if( this.categoryId ) {
        // Paso 2: Obtener los datos de la categoria por ID
        this.httpCategory.getCategoryById( this.categoryId ).subscribe({
          next: ( data ) => {
            console.log( 'Categoria ', data );
          },
          error: ( err ) => {
            console.error(err);
          },
          complete: () => {}
        });
    }

    // this.httpCategory.getCategoryById();
  }

}
