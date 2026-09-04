# Aula TI

Pizarrones digitales para clases de Tecnologías de la Información.

**Sitio:** https://aula.andresatencio.com

Aula TI reúne materiales utilizados en clase para proyectarlos, consultarlos y recuperarlos después, especialmente cuando un estudiante faltó o no pudo copiar un pizarrón.

## Contenido

Los pizarrones pueden encontrarse de dos maneras:

- por espacio curricular;
- por recorrido de enseñanza, según el lugar y el período en que se usaron.

### Sistemas Informáticos

- Preguntas y conceptos principales
- El estado de un sistema
- Arquitectura de Von Neumann
- El sistema operativo
- Sistemas digitales: hardware y software
- Instrucciones, datos, operaciones y resultados
- Entrada, procesamiento y salida
- Procesador y memoria durante la ejecución

### Pensamiento Computacional

- La máquina obedece exactamente
- Hilos y agentes
- Agentes y arneses

### Recorridos por escuela

- **Gabriela Mistral · 2.º cuatrimestre 2026**
- **Sistemas Informáticos · CFP 7 · 2026**

Cada pizarrón tiene una única página. Un mismo pizarrón puede formar parte de más de un recorrido; los recorridos lo referencian sin duplicar el contenido.

## Implementación

Aula TI es un sitio estático construido con:

- Astro
- TypeScript
- HTML
- CSS
- SVG

No utiliza framework de componentes, CMS, backend, base de datos ni autenticación.

## Deploy

El sitio se publica en **Cloudflare Workers + Static Assets**.

Cada push a `main` ejecuta automáticamente mediante GitHub Actions:

1. `npm ci`
2. `npm run check`
3. `npm run build`
4. `npx wrangler deploy`

El dominio público es:

https://aula.andresatencio.com

## Desarrollo local

Requisitos:

- Node.js 22 o superior, en una versión par;
- npm.

Instalación:

```bash
npm ci
```

Servidor de desarrollo:

```bash
npm run dev
```

Por defecto queda disponible en:

```text
http://localhost:4321/
```

## Validación

Comprobación de Astro y TypeScript:

```bash
npm run check
```

Build de producción:

```bash
npm run build
```

El sitio generado queda en:

```text
dist/
```

Para servir localmente el build de producción:

```bash
npm run preview
```
