import { Injectable } from '@angular/core';
import { Funcionario, Persona } from '../models/persona';
import { LocalStorage } from './local-storage';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private readonly CLAVE = 'funcionarios';

  constructor(private readonly localStorage: LocalStorage) {}

  obtenerDatosIniciales(): Persona[] {
    return [
      { id: 1, nombre: 'María', apellido: 'González', correo: 'maria.gonzalez@municipalidad.cl', telefono: '2201', unidad: 'Administración', cargo: 'Secretaria', estado: 'activo' },
      { id: 2, nombre: 'José', apellido: 'Rojas', correo: 'jose.rojas@municipalidad.cl', telefono: '2202', unidad: 'Finanzas', cargo: 'Analista', estado: 'activo' },
      { id: 3, nombre: 'Ana', apellido: 'Muñoz', correo: 'ana.munoz@municipalidad.cl', telefono: '2203', unidad: 'Salud', cargo: 'Enfermera', estado: 'activo' },
      { id: 4, nombre: 'Camilo', apellido: 'Silva', correo: 'camilo.silva@municipalidad.cl', telefono: '2204', unidad: 'Transporte', cargo: 'Inspector', estado: 'inactivo' },
      { id: 5, nombre: 'Paula', apellido: 'Vera', correo: 'paula.vera@municipalidad.cl', telefono: '2205', unidad: 'Educación', cargo: 'Profesora', estado: 'activo' },
      { id: 6, nombre: 'Ricardo', apellido: 'Pérez', correo: 'ricardo.perez@municipalidad.cl', telefono: '2206', unidad: 'Obras', cargo: 'Ingeniero', estado: 'activo' },
      { id: 7, nombre: 'Valentina', apellido: 'Castro', correo: 'valentina.castro@municipalidad.cl', telefono: '2207', unidad: 'Recursos Humanos', cargo: 'Analista', estado: 'activo' },
      { id: 8, nombre: 'Fernando', apellido: 'López', correo: 'fernando.lopez@municipalidad.cl', telefono: '2208', unidad: 'Seguridad', cargo: 'Supervisor', estado: 'inactivo' },
      { id: 9, nombre: 'Daniela', apellido: 'Mora', correo: 'daniela.mora@municipalidad.cl', telefono: '2209', unidad: 'Cultura', cargo: 'Coordinadora', estado: 'activo' },
      { id: 10, nombre: 'Sebastián', apellido: 'Torres', correo: 'sebastian.torres@municipalidad.cl', telefono: '2210', unidad: 'Tecnologías', cargo: 'Técnico', estado: 'activo' },
      { id: 11, nombre: 'Isidora', apellido: 'Sánchez', correo: 'isidora.sanchez@municipalidad.cl', telefono: '2211', unidad: 'Compras', cargo: 'Encargada', estado: 'inactivo' },
      { id: 12, nombre: 'Nicolás', apellido: 'Araya', correo: 'nicolas.araya@municipalidad.cl', telefono: '2212', unidad: 'Vivienda', cargo: 'Arquitecto', estado: 'activo' },
    ];
  }

  listar(): Persona[] {
    const datos = this.localStorage.leer<Persona[]>(this.CLAVE);
    if (!datos || datos.length === 0) {
      const iniciales = this.obtenerDatosIniciales();
      this.localStorage.guardar(this.CLAVE, iniciales);
      return iniciales;
    }
    return datos;
  }

  guardarLista(funcionarios: Persona[]): void {
    this.localStorage.guardar(this.CLAVE, funcionarios);
  }

  agregar(funcionario: Persona): void {
    const funcionarios = this.listar();
    funcionarios.push(funcionario);
    this.guardarLista(funcionarios);
  }

  actualizar(funcionario: Persona): void {
    const funcionarios = this.listar();
    const indice = funcionarios.findIndex((item) => item.id === funcionario.id);
    if (indice !== -1) {
      funcionarios[indice] = funcionario;
      this.guardarLista(funcionarios);
    }
  }

  eliminar(id: number): void {
    const funcionarios = this.listar().filter((item) => item.id !== id);
    this.guardarLista(funcionarios);
  }

  generarId(): number {
    const funcionarios = this.listar();
    return funcionarios.length > 0 ? Math.max(...funcionarios.map((item) => item.id)) + 1 : 1;
  }

  buscar(funcionarios: Persona[], texto: string): Persona[] {
    const valor = texto.trim().toLowerCase();
    if (!valor) {
      return funcionarios;
    }

    return funcionarios.filter((funcionario) =>
      funcionario.nombre.toLowerCase().includes(valor) ||
      funcionario.apellido.toLowerCase().includes(valor) ||
      funcionario.correo.toLowerCase().includes(valor),
    );
  }
}
