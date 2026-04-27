# Challenge Frontend Bidcom

Aplicacion ecommerce construida con Next.js (App Router), TypeScript y Tailwind CSS, consumiendo productos desde DummyJSON.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest + Testing Library + MSW

## Requisitos

- Node.js 20+
- npm 10+

## Instalacion

```bash
npm install
```

## Comandos

- `npm run dev`: levanta entorno local en `http://localhost:3000`
- `npm run build`: compila para produccion
- `npm run start`: ejecuta build de produccion
- `npm run lint`: corre ESLint
- `npm run test`: ejecuta tests una vez (Vitest)
- `npm run test:watch`: ejecuta tests en modo watch

## Funcionalidades implementadas

- Home (`/`) con listado de 20 productos.
- Header con logo de Bidcom y buscador.
- Filtro por categorias en Home mediante dropdown (`/?category=slug`).
- Paginacion en Home y Search (`?page=N`) manteniendo filtros activos.
- Busqueda por URL (`/search?s=...`) via formulario GET.
- Resolucion de busqueda por termino libre y por categoria.
- Empty state con mensaje y 5 categorias recomendadas.
- Detalle de producto por SKU (`/product/[sku]`).
- Pagina `not-found` personalizada.
- Pagina `error` global personalizada.
- `loading` global con skeletons.

## Arquitectura

Se uso una **Clean Architecture liviana por feature**, centrada en `catalog`.

```text
src/
  app/
    page.tsx
    search/page.tsx
    product/[sku]/page.tsx
    not-found.tsx
    error.tsx
    loading.tsx

  features/catalog/
    domain/
    application/
    infrastructure/
    presentation/

  components/
  lib/
  test/
```

Criterio de organizacion:

- `features/catalog/presentation`: componentes especificos de catalogo (`ProductCard`, `ProductGrid`, `ProductDetail`, `EmptyResults`, `CategoryDropdown`).
- `components`: componentes transversales (`Header`, `SearchForm`, `PageShell`, `Logo`, `Container`, `PaginationControls`).

## Decisiones tecnicas importantes

### 1) Categorias en `/search?s=...`

El enunciado pide links de categoria a `/search?s=$categoria`. Sin embargo, DummyJSON no siempre devuelve resultados consistentes usando solo `products/search?q=...` con slugs de categoria.

Resolucion implementada:

- Si `s` coincide con un slug de categoria, se usa `GET /products/category/:slug?limit=20`.
- Si no coincide, se usa `GET /products/search?q=:term&limit=20`.

Esto mantiene la URL requerida y evita falsos vacios por limitaciones del endpoint de busqueda.

### 2) Detalle por SKU sin endpoint directo

DummyJSON no expone un endpoint por SKU.

Resolucion implementada:

- El repositorio trae productos y resuelve `getProductBySku(sku)` en servidor comparando por campo `sku`.
- Si no existe coincidencia, la ruta usa `notFound()`.

### 3) Rutas dinamicas para evitar fallos de build por rate-limit

Durante `next build`, se hacían requests a DummyJSON y devolvía `429 Too Many Requests`.

Por este motivo, se definieron estas rutas como dinamicas:

- `src/app/page.tsx`
- `src/app/search/page.tsx`
- `src/app/product/[sku]/page.tsx`

Con:

```ts
export const dynamic = "force-dynamic";
```

Esto evita prerender estatico de esas paginas y mantiene render server-side on-demand.

### 4) Cache y revalidate

Se usa `fetch` server-side con `next.revalidate` y tags en el cliente HTTP/repositorio para balancear disponibilidad y performance.

### 5) Paginacion y filtros por URL
Se implemento paginacion y filtros en la URL para que el estado de navegacion sea compartible y consistente.
Comportamiento implementado:
- Home:
  - `/?page=2` para navegar paginas.
  - `/?category=smartphones` para filtrar.
  - combinacion: `/?category=smartphones&page=2`.
- Search:
  - `/search?s=phone&page=2`.
  - si `s` no esta presente o esta vacio, `/search` muestra el listado general paginado.
La paginacion se resuelve desde el repositorio con `limit + skip`, devolviendo metadatos (`currentPage`, `totalPages`, `total`) para construir los controles de navegacion.
