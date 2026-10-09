# Arquitectura InforMeta

## MVP
Panel Next.js App Router con fuente demostrativa determinista y agregaciones puras de TypeScript. El endpoint `/api/reports` es **público pero exclusivamente demo**. No reutilizarlo con información privada sin autenticación y autorización obligatoria por cliente.

## Modelo
`MetricRow` contiene fecha ISO, cliente, campaña, inversión, impresiones, clics y contactos. Se suman contadores antes de calcular CTR, CPC, CPL y CPM. Denominador cero produce `null`, nunca cero ficticio.

## Producción posterior
- Auth y roles, control de acceso en cada consulta.
- Base de datos: clientes, cuentas, tokens cifrados, jobs, informes y auditoría.
- Conector server-side a Meta Marketing API; cuotas, paginación, expiración de token, errores y backoff.
- Mapeo de `actions` específico por objetivo (leads, mensajes, compras); no confundir métricas heterogéneas.
- Usar timezone y moneda de cada ad account; seleccionar fechas de reporte y atribución explícitamente.
- Exportación, plantillas y explicación trazable de KPIs.
