import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryList {
  public categories$: Observable<any[]> = new Observable<any[]>();

  constructor( private httpCategory: HttpCategory ) {}

  // Usamos el Hook del Ciclo de vida que avisa que se esta inicializando el componente
  ngOnInit() {
    this.categories$ = this.httpCategory.getCategories()
      // IMPORTANTE: Si la estructura de datos que Ud esta trayendo del Backend tiene varias propiedades, asegurece de extraer solo los datos que necesita
      // .pipe(
      //   map( data => {
      //     return data.data;
      //   }),
      //   catchError( err => {
      //     return of([])
      //   })
      // );
  }

  onDelete( id: string ) {
    console.info( `Elimina la categoria con id: ${ id }` );
  }

  onEdit( id: string ) {
    console.info( `Edita la categoria con id: ${ id }` );
  }

}
