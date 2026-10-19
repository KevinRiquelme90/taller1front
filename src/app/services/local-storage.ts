import { Service } from '@angular/core';
import{Persona} from '../models/persona';


@Service()
export class LocalStorage {
  private readonly CLAVE = 'personas';


  obtenerTodos(): Persona [] {
    const datos = LocalStorage.getItem(this.CLAVE);
    return datos ? json.parse(datos) : [];
  }

  guardar(persona: Persona): void {
    const personas = this.obtenerTodos();
    personas.push(persona);
    localStorage.setItem(this.CLAVE, JSON.stringify(personas));

  }

  eliminar(): void {

  }
}
