# InforMeta

Dashboard MVP de informes de campañas de Fanger Design en **Next.js 15, React 19 y TypeScript**.

**IMPORTANTE: MODO DEMO.** Todas las métricas son sintéticas, no existen cuentas Meta Ads conectadas, autenticación, persistencia ni exportación. No utilizar los datos para informes reales.

## Ejecutar

Requiere Node.js 22.6 o posterior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Validar

```bash
npm test
npm run typecheck
npm run build
```

## Incluye

- Dashboard en español, responsive y modo oscuro.
- Dos clientes ficticios, filtros de 7 y 30 días.
- KPIs: inversión, contactos, CPL, CTR, CPC y CPM.
- Gráfico diario y tabla de campañas.
- Comparación con período anterior, calculando porcentajes desde totales agregados.
- Endpoint de ejemplo: `GET /api/reports?client=demo-moda&range=7`.
- Pruebas unitarias de agregación y división por cero.

## Estructura

`src/lib/report.ts`: dominio y cálculos. `src/lib/demo-data.ts`: fuente ficticia determinista (hasta 2026-10-07). `src/app/page.tsx`: dashboard. `src/components/spend-chart.tsx`: gráfico SVG. `src/app/api/reports/route.ts`: API ficticia.

## Siguientes hitos

1. Autenticación y permisos por cliente.
2. Persistencia, cuentas publicitarias y credenciales seguras del servidor.
3. Conector de Meta Marketing API con paginación, reintentos y normalización de acciones.
4. Sincronizaciones, trazabilidad y tratamiento correcto de moneda/zona horaria.
5. Informes personalizados y exportación PDF/XLSX.

Ningún token debe guardarse en el repositorio ni exponerse mediante variables `NEXT_PUBLIC_`.
