import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Funcionario, Persona } from '../../models/persona';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla {
  @Input() funcionarios: Persona[] = [];
  @Output() editarFuncionario = new EventEmitter<Persona>();
  @Output() eliminarFuncionario = new EventEmitter<number>();

  mostrarResultados = true;

  editar(funcionario: Persona): void {
    this.editarFuncionario.emit(funcionario);
  }

  eliminar(id: number): void {
    this.eliminarFuncionario.emit(id);
  }

  obtenerEstadoClase(estado: string): string {
    return estado === 'activo' ? 'estado estado--activo' : 'estado estado--inactivo';
  }
}
