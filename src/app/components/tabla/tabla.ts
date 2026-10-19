import { Component } from '@angular/core';
import {Persona} from '../../models/persona';
import {LocalStorage} from '../../services/local-storage';

@Component({
  imports: [],
  selector: 'app-tabla',
  styleUrl: './tabla.css',
  templateUrl: './tabla.html',
})
export class Tabla {
  personas: Persona[]= [];


  constructor(private localStorage: LocalStorage) {}

  ngOnInit() {
    this.personas = this.localStorage.obtenerTodos();

  }

}
