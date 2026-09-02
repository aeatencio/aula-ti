# Aula TI

Sitio docente de Tecnologías de la Información. Reúne materiales de clase pensados para proyectar y leer en el aula.

A futuro podrá incluir distintos tipos de materiales —por ejemplo Pizarrones, Actividades, Fichas o Evaluaciones— organizados por espacios curriculares. Este repositorio todavía no es esa plataforma: por ahora publica solo la sección **Pizarrones**.

## Alcance actual

- Home mínima de Aula TI
- Listado de `/pizarrones/` por espacio curricular
- **Sistemas Informáticos** — *Preguntas y conceptos principales*, *El estado de un sistema*, *El sistema operativo*, *Hardware, software y tarea*
- **Pensamiento Computacional** — *La máquina obedece exactamente*
- Segunda vía de acceso en `/escuelas/`, por escuela y período: **Gabriela Mistral · 2.º cuatrimestre 2026**

Los pizarrones son páginas canónicas. Una misma página puede referenciarse desde el índice por espacio curricular y desde un recorrido de escuela; no se duplica el contenido.

No hay backend, base de datos, autenticación ni CMS. El contenido vive en páginas Astro.

## Cómo ejecutarlo

Requisitos: Node.js 22 o superior (versión par).

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
