import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Funcionario, Persona } from '../../models/persona';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  @Input() funcionarioSeleccionado: Persona | null = null;
  @Output() guardarCompletado = new EventEmitter<void>();

  funcionario: Funcionario = this.crearFuncionarioVacio();
  errorMensaje = '';
  exitoMensaje = '';

  unidades = ['Administración', 'Finanzas', 'Salud', 'Transporte', 'Educación', 'Obras', 'Recursos Humanos', 'Seguridad', 'Cultura', 'Tecnologías', 'Compras', 'Vivienda'];
  cargos = ['Secretaria', 'Analista', 'Enfermera', 'Inspector', 'Profesora', 'Ingeniero', 'Supervisor', 'Coordinadora', 'Técnico', 'Encargada', 'Arquitecto'];

  constructor(private readonly funcionarioService: FuncionarioService) {}

  ngOnChanges(): void {
    if (this.funcionarioSeleccionado) {
      this.funcionario = { ...this.funcionarioSeleccionado };
    } else {
      this.funcionario = this.crearFuncionarioVacio();
    }
  }

  guardar(): void {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.validarFormulario()) {
      return;
    }

    const funcionarios = this.funcionarioService.listar();
    const correoDuplicado = funcionarios.some(
      (item) =>
        item.correo.toLowerCase() === this.funcionario.correo.toLowerCase() &&
        item.id !== this.funcionario.id,
    );

    if (correoDuplicado) {
      this.errorMensaje = 'El correo institucional ya está registrado para otro funcionario.';
      return;
    }

    if (this.funcionario.id === 0) {
      const nuevoFuncionario = {
        ...this.funcionario,
        id: this.funcionarioService.generarId(),
      };
      this.funcionarioService.agregar(nuevoFuncionario);
      this.exitoMensaje = 'Funcionario agregado correctamente.';
    } else {
      this.funcionarioService.actualizar(this.funcionario);
      this.exitoMensaje = 'Funcionario actualizado correctamente.';
    }

    this.funcionario = this.crearFuncionarioVacio();
    this.funcionarioSeleccionado = null;
    this.guardarCompletado.emit();
  }

  cancelarEdicion(): void {
    this.funcionario = this.crearFuncionarioVacio();
    this.funcionarioSeleccionado = null;
    this.errorMensaje = '';
    this.exitoMensaje = '';
  }

  private validarFormulario(): boolean {
    if (!this.funcionario.nombre.trim()) {
      this.errorMensaje = 'El nombre es obligatorio.';
      return false;
    }

    if (!this.funcionario.apellido.trim()) {
      this.errorMensaje = 'El apellido es obligatorio.';
      return false;
    }

    if (!this.funcionario.correo.trim()) {
      this.errorMensaje = 'El correo es obligatorio.';
      return false;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.funcionario.correo.trim());
    if (!correoValido) {
      this.errorMensaje = 'El correo debe tener un formato válido.';
      return false;
    }

    if (!this.funcionario.telefono.trim()) {
      this.errorMensaje = 'El teléfono o anexo es obligatorio.';
      return false;
    }

    const telefonoValido = /^[0-9+\-() ]{5,20}$/.test(this.funcionario.telefono.trim());
    if (!telefonoValido) {
      this.errorMensaje = 'El teléfono o anexo debe tener un formato válido.';
      return false;
    }

    if (!this.funcionario.unidad.trim()) {
      this.errorMensaje = 'Debe seleccionar una unidad o departamento.';
      return false;
    }

    if (!this.funcionario.cargo.trim()) {
      this.errorMensaje = 'Debe ingresar un cargo.';
      return false;
    }

    if (!['activo', 'inactivo'].includes(this.funcionario.estado)) {
      this.errorMensaje = 'Debe indicar si el funcionario está activo o inactivo.';
      return false;
    }

    return true;
  }

  private crearFuncionarioVacio(): Funcionario {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      unidad: '',
      cargo: '',
      estado: 'activo',
    };
  }
}
