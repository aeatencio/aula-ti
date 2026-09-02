# Aula TI

Sitio docente de Tecnologías de la Información. Reúne materiales de clase pensados para proyectar y leer en el aula.

A futuro podrá incluir distintos tipos de materiales —por ejemplo Pizarrones, Actividades, Fichas o Evaluaciones— organizados por espacios curriculares. Este repositorio todavía no es esa plataforma: por ahora publica solo la sección **Pizarrones**.

## Alcance actual

- Home mínima de Aula TI
- Listado de `/pizarrones/`
- **Sistemas Informáticos** — *El estado de un sistema*, *El sistema operativo*, *Hardware, software y tarea*
- **Pensamiento Computacional** — *La máquina obedece exactamente*

No hay backend, base de datos, autenticación ni CMS. El contenido vive en páginas Astro.

## Cómo ejecutarlo

Requisitos: Node.js 22.12.0 o superior.

```bash
npm install
npm run dev
```

El servidor local queda en `http://localhost:4321/`.

Otras órdenes:

```bash
npm run check   # verificación de TypeScript
npm run build   # sitio estático en dist/
npm run preview # sirve el build de producción
```
