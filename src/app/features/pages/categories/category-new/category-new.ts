import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpCategory } from '../../../../core/services/http-category';


@Component({
  selector: 'app-category-new',
  imports: [ReactiveFormsModule],
  templateUrl: './category-new.html',
  styleUrl: './category-new.css',
})
export class CategoryNew {
  // Define el atributo que contendra la estructura del formulario (agrupa los campos del formulario)

  formData!: FormGroup;   // Tipado que me sugiere Angular para los formularios reactivos
  registerSubscribed!: Subscription // Intento controlar cuando Subcribir/Dessubcribir un servicio

  constructor(
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

  // Metodo con el que vamos a capturar los datos del formulario al presionar el boton de 'Register'
  onSubmit() {

    // Verificar si el formulario es valido.
    // IMPORTANTE: Si los campos del formulario no tienen validaciones, el estado del formulario siempre sera valido
    if( this.formData.valid ) {
      // Registra --> Service
      console.log( this.formData.value );    // Muestra los valores de los campos del formulario
      this.registerSubscribed = this.httpCategory.createCategory( this.formData.value ).subscribe({
        next: ( data ) => {
          console.log( data );
          // Limpia los campos del formulario solo cuando registra
          this.formData.reset();
          // Redirecciona a la lista de categorias
          this.router.navigateByUrl( '/dashboard/categories' );
        },
        error: ( error ) => {
          // Muestra las excepciones
          console.error( error );
        },
        complete: () => {
          // Toca todos los campos y activa o despliega los mensajes de error.
          this.formData.markAsTouched();
        }
      });

    }
    else {
      // Muestre todos los mensajes de error de cada uno de los campos en la vista
      console.log( 'Formulario invalido' );
    }

  }

  ngOnDestroy(): void {
    console.info('ngOnDestroy');
    if( this.registerSubscribed ) {
      console.info('unSubscribe');
      this.registerSubscribed.unsubscribe();    // Dessucribirme manualmente
    }
  }
}
