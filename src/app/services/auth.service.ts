import { Injectable } from '@angular/core';

export interface UsuarioDemo {
  correo: string;
  password: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USUARIO_DEMO: UsuarioDemo = {
    correo: 'admin@municipalidad.cl',
    password: 'admin123',
    nombre: 'Administrador',
  };

  private readonly CLAVE_SESION = 'directorioSesion';

  iniciarSesion(correo: string, password: string): boolean {
    const usuarioValido =
      correo.trim().toLowerCase() === this.USUARIO_DEMO.correo &&
      password === this.USUARIO_DEMO.password;

    if (usuarioValido) {
      window.localStorage.setItem(
        this.CLAVE_SESION,
        JSON.stringify({ correo: this.USUARIO_DEMO.correo, nombre: this.USUARIO_DEMO.nombre, autenticado: true }),
      );
      return true;
    }

    return false;
  }

  cerrarSesion(): void {
    window.localStorage.removeItem(this.CLAVE_SESION);
  }

  estaAutenticado(): boolean {
    const sesion = window.localStorage.getItem(this.CLAVE_SESION);
    return !!sesion && JSON.parse(sesion).autenticado === true;
  }

  obtenerSesion(): { correo: string; nombre: string; autenticado: boolean } | null {
    const sesion = window.localStorage.getItem(this.CLAVE_SESION);
    return sesion ? JSON.parse(sesion) : null;
  }
}
