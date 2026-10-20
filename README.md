# Directorio de funcionarios públicos

Aplicación Angular para gestionar un directorio institucional de funcionarios públicos. El proyecto incluye autenticación demo, acceso protegido a rutas privadas, CRUD de funcionarios, búsqueda, filtros combinables y persistencia con `localStorage`.

## Requisitos

- Node.js 20 o superior
- npm
- Angular CLI (o usar `npx ng` desde el proyecto)

## Instalación

```bash
npm install
```

## Ejecutar la aplicación

```bash
ng serve
```

También puedes usar:

```bash
npm start
```

Luego abre la aplicación en: `http://localhost:4200`

## Credenciales de demostración

Usuario de prueba:

- Correo: `admin@municipalidad.cl`
- Contraseña: `admin123`

## Funcionalidades principales

- Inicio de sesión con validación de campos
- Sesión persistente en `localStorage`
- Protección de rutas privadas mediante `authGuard`
- Cierre de sesión desde el encabezado
- Tabla de funcionarios con 12 registros ficticios iniciales
- Crear, editar y eliminar funcionarios
- Validaciones de nombre, correo, teléfono, unidad, cargo y estado
- Validación de correo duplicado
- Búsqueda por nombre, apellido y correo
- Filtros por unidad, cargo y estado
- Resultado actualizado automáticamente al guardar o eliminar datos
- Persistencia de registros tras recargar la página

## Persistencia con localStorage

La aplicación no escribe en `localStorage` desde componentes ni páginas. Toda la lectura y escritura se hace desde servicios de Angular (`AuthService` y `FuncionarioService`). Esto permite que la sesión y los funcionarios se mantengan en el navegador aunque se recargue la página.

## Compilar para entrega

```bash
npm run build
```

Esto genera la versión compilada en la carpeta `dist/` para revisión o entrega del proyecto.

## Entrega recomendada

Antes de entregar, comprime la carpeta del proyecto sin incluir `node_modules` para que el archivo final quede más ligero y limpio.
