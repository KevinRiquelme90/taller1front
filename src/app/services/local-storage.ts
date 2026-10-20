import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorage {
  leer<T>(clave: string): T | null {
    const datos = window.localStorage.getItem(clave);
    if (!datos) {
      return null;
    }

    try {
      return JSON.parse(datos) as T;
    } catch {
      return null;
    }
  }

  guardar<T>(clave: string, valor: T): void {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  }

  eliminar(clave: string): void {
    window.localStorage.removeItem(clave);
  }
}
