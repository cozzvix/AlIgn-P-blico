# AlIgn

Aplicacion web educativa sobre inteligencia artificial, metacognicion y salud cerebral.

## Requisitos

- Node.js
- pnpm
- Un proyecto de Supabase propio

## Configuracion local

1. Instala dependencias:

```bash
pnpm install
```

2. Copia las variables de entorno:

```bash
cp .env.example .env.local
```

3. Llena `.env.local` con las credenciales publicas de tu proyecto de Supabase.

4. Inicia el servidor:

```bash
pnpm dev
```

## Base de datos

Los scripts SQL estan en `supabase/`. Ejecutalos en el SQL Editor de Supabase para crear las tablas, politicas RLS y triggers necesarios.

Este repositorio no incluye llaves privadas, archivos `.env`, historial Git ni dependencias instaladas.
