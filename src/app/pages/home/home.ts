import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../components/footer/footer';
import { Formulario } from '../../components/formulario/formulario';
import { Header } from '../../components/header/header';
import { Tabla } from '../../components/tabla/tabla';
import { Persona } from '../../models/persona';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Formulario, Tabla, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly funcionarioService = inject(FuncionarioService);

  funcionarios: Persona[] = [];
  funcionariosFiltrados: Persona[] = [];
  funcionarioSeleccionado: Persona | null = null;
  textoBusqueda = '';
  unidadSeleccionada = '';
  cargoSeleccionado = '';
  estadoSeleccionado = '';
  mensajeResultado = '';

  unidades = ['Administración', 'Finanzas', 'Salud', 'Transporte', 'Educación', 'Obras', 'Recursos Humanos', 'Seguridad', 'Cultura', 'Tecnologías', 'Compras', 'Vivienda'];
  cargos = ['Secretaria', 'Analista', 'Enfermera', 'Inspector', 'Profesora', 'Ingeniero', 'Supervisor', 'Coordinadora', 'Técnico', 'Encargada', 'Arquitecto'];

  ngOnInit(): void {
    this.recargarFuncionarios();
  }

  recargarFuncionarios(): void {
    this.funcionarios = this.funcionarioService.listar();
    this.aplicarFiltros();
    this.funcionarioSeleccionado = null;
    this.mensajeResultado = this.funcionarios.length > 0 ? 'Directorio actualizado correctamente.' : 'No hay funcionarios registrados.';
  }

  abrirEdicion(funcionario: Persona): void {
    this.funcionarioSeleccionado = { ...funcionario };
  }

  limpiarFiltros(): void {
    this.textoBusqueda = '';
    this.unidadSeleccionada = '';
    this.cargoSeleccionado = '';
    this.estadoSeleccionado = '';
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const resultado = this.funcionarioService.listar().filter((funcionario) => {
      const coincideTexto =
        !this.textoBusqueda ||
        funcionario.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        funcionario.apellido.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
        funcionario.correo.toLowerCase().includes(this.textoBusqueda.toLowerCase());

      const coincideUnidad = !this.unidadSeleccionada || funcionario.unidad === this.unidadSeleccionada;
      const coincideCargo = !this.cargoSeleccionado || funcionario.cargo === this.cargoSeleccionado;
      const coincideEstado = !this.estadoSeleccionado || funcionario.estado === this.estadoSeleccionado;

      return coincideTexto && coincideUnidad && coincideCargo && coincideEstado;
    });

    this.funcionariosFiltrados = resultado;
    this.mensajeResultado = resultado.length > 0 ? '' : 'No existen coincidencias para los filtros actuales.';
  }

  confirmarEliminacion(id: number): void {
    const confirmar = window.confirm('¿Deseas eliminar este funcionario?');
    if (!confirmar) {
      return;
    }

    this.funcionarioService.eliminar(id);
    this.recargarFuncionarios();
  }
}
