import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { HttpCategory } from '../../../../core/services/http-category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './category-edit.html',
  styleUrl: './category-edit.css',
})
export class CategoryEdit {
  // Define el atributo que contendra la estructura del formulario (agrupa los campos del formulario)

  formData!: FormGroup;   // Tipado que me sugiere Angular para los formularios reactivos
  registerSubscribed!: Subscription // Intento controlar cuando Subcribir/Dessubcribir un servicio

  categoryId!: string | null;     // Guardar el ID que viene en la ruta

  constructor(
    private activatedRoute: ActivatedRoute,   // Dependencia que tiene la informacion sobre la ruta activa
    private httpCategory: HttpCategory,
    private router: Router
  ) {
     // Instanciando un objeto de la clase FormGroup (para crear en el formulario), se usa para agrupar los campos que llevara el formulario.
    this.formData = new FormGroup({
        name: new FormControl(
          '',
          [ Validators.required, Validators.minLength( 3 ) ]
        ),    // Instanciando un objeto de la clase FormControl (para crear un campo dentro del formulario)
        description: new FormControl(
          '',
          [ Validators.required, Validators.minLength( 15 ), Validators.maxLength( 140 ) ]
        )
    });
  }

  // TODO: Refactorizar el ngOnInit
  // ¿Por qué?: Por que un metodo/funcion solo debe realizar una tarea
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

            // Paso 3: Actualizar los campos del formulario
            this.formData.patchValue({
              name: data.name,
              description: data.description
            });
          },
          error: ( err ) => {
            console.error(err);
          },
          complete: () => {}
        });
    }

    // this.httpCategory.getCategoryById();
  }

  onSubmit() {
    // Verificamos si el formulario es valido
    if( this.formData.valid ) {
      // Actualiza --> Service
      this.httpCategory.updateCategoryById(
        this.categoryId,
        this.formData.value
      ).subscribe({
        next: ( data ) => {
          console.log( data );
          this.formData.reset();                              // Limpiamos el formulario
          this.router.navigateByUrl('/dashboard/categories'); // Redirecciona
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.formData.markAsTouched();  // Despliega todos los mensajes de error por que toca todos los campos del formulario
        }
      });
    }
    else {
      // Muestre todos los mensajes de error de cada uno de los campos en la vista
      console.log( 'Formulario invalido' );
    }
  }

}
