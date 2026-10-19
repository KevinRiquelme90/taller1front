import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorage} from '../../services/local-storage';
impor

@Component({
  imports: [],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario {


  constructor(private localStorage : LocalStorage) {
  }

  guardar(){
  this.localStorage.guardar
  }

}
