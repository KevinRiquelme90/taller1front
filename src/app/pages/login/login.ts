import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  password = '';
  mensajeError = '';
  mensajeExito = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  iniciarSesion(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.correo.trim() || !this.password.trim()) {
      this.mensajeError = 'Debe completar correo y contraseña.';
      return;
    }

    const ok = this.authService.iniciarSesion(this.correo, this.password);
    if (!ok) {
      this.mensajeError = 'Credenciales incorrectas. Intente nuevamente.';
      return;
    }

    this.mensajeExito = 'Inicio de sesión correcto.';
    this.router.navigate(['/directorio']);
  }
}
