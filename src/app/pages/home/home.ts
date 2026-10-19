import { Component } from '@angular/core';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {Tabla} from '../../components/tabla/tabla';
import {Formulario} from '../../components/formulario/formulario';

@Component({
  imports: [Footer , Header,Tabla,Formulario],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
