import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-new',
  imports: [ReactiveFormsModule],
  templateUrl: './category-new.html',
  styleUrl: './category-new.css',
})
export class CategoryNew {
  // Define el atributo que contendra la estructura del formulario (agrupa los campos del formulario)

  formData!: FormGroup;   // Tipado que me sugiere Angular para los formularios reactivos

  constructor() {
    // Instanciando un objeto de la clase FormGroup (para crear en el formulario), se usa para agrupar los campos que llevara el formulario.
    this.formData = new FormGroup({
      name: new FormControl( '' ),    // Instanciando un objeto de la clase FormControl (para crear un campo dentro del formulario)
      description: new FormControl( '' )
    });
  }

  // Metodo con el que vamos a capturar los datos del formulario al presionar el boton de 'Register'
  onSubmit() {

    // Verificar si el formulario es valido.
    // IMPORTANTE: Si los campos del formulario no tienen validaciones, el estado del formulario siempre sera valido
    if( this.formData.valid ) {
      // Registra --> Service
      console.log( this.formData.value);    // Muestra los valores de los campos del formulario

    }
    else {
      // Muestre todos los mensajes de error de cada uno de los campos en la vista
      console.log( 'Formulario invalido' );
    }

  }
}
