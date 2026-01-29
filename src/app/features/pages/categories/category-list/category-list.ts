import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpCategory } from '../../../../core/services/http-category';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [AsyncPipe],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryList {
  // Paso 1: Define atributo de clase PUBLICA (Datos que se van a renderizar). Debe ser un Observable.
  public categories$: Observable<any[]> = new Observable<any[]>();

  // Paso 2: Define el Trigger (Disparador). Tiene un valor inicial y emitira los cambios (stributo publico)
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor( private httpCategory: HttpCategory ) {}

  // Usamos el Hook del Ciclo de vida que avisa que se esta inicializando el componente
  ngOnInit() {
    // Paso 3: Asociando el trigger que va a emitir los datos, con el Observable de salida que va a mostrarlos en la vista (Definiendo lo que va a hacer el Disparador)
    this.categories$ = this.refreshTrigger$.pipe(
      switchMap( () => this.httpCategory.getCategories() ),   // Obtener las categorias a traves del servicio
    );
  }

  onDelete( id: string ) {
    console.info( `Elimina la categoria con id: ${ id }` );

    this.httpCategory.deleteCategoryById( id ).subscribe({
      next: data => {
        console.log( data );
        // Paso 4: Invoco el Trigger y disparo la accion programada
        this.refreshTrigger$.next();
      },
      error: error => {
        console.error( error );
      }
    });
  }

  onEdit( id: string ) {
    console.info( `Edita la categoria con id: ${ id }` );
    // Esto se ejecuto, por ende haga algo otra cosa
  }

}
