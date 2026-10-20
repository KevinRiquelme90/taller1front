export interface Funcionario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  unidad: string;
  cargo: string;
  estado: 'activo' | 'inactivo';
}

export type Persona = Funcionario;
