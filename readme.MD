# Ejercicio 4 Node.js - API Facturas

Monta una API a partir del JSON de facturas. Esta API debe tener los siguientes endpoints:

(GET) /facturas/ -> listado de todas las facturas
(GET) /facturas/ingresos -> listado de ingresos
(GET) /facturas/gastos -> listado de gastos

Estos tres endpoints anteriores deben devolver un objeto con esta forma:
```javascript
{
  total: x,
  datos: []
}
```

(GET) /facturas/factura/:idFactura -> detalle de una factura a partir de su id
(POST) /facturas/factura -> crear una nueva factura, devuelve la factura nueva
(PUT) /facturas/factura/:idFactura -> sustituir una factura por otra a partir de su id, devuelve la factura nueva
(PATCH) /facturas/factura/:idFactura -> modificar una parte de una factura a partir de su id, devuelve la factura modificada
(DELETE) /facturas/factura/:idFactura -> borrar una factura a partir de su id, devuelve la factura borrada

Todos los endpoints que reciban una factura en el body deben validar su forma con express-validator. Los datos obligatorios que debe llevar una factura son `id`, `numero`, `fecha`, `base`, `tipoIva`, `tipo` y `abonada`.

Vencimiento puede no estar, y si está puede ser vacío.

La base debe ser un float.

El tipoIva debe ser un entero.

El tipo debe ser `"gasto"` o `"ingreso"`.

Todos los endpoints con :idFactura deben validar con express-validator que la factura exista.

Filtros: a los endpoints de listados (los tres primeros) se les deben poder pasar los siguientes parámetros query:
- `abonadas=true` o `abonadas=false` -> filtra según si las facturas están abonadas o no
- `vencidas=true` o `vencidas=false` -> filtra según si las facturas han vencido o no
- `ordenPor=fecha` o `ordenPor=base` -> ordena por fecha o por base imponible
- `orden=asc` o `orden=desc` -> dirección del orden (asc si no se le pasa nada)
- `nPorPagina=x` -> mostrar sólo `x` facturas por página
- `pagina=x` -> mostrar las facturas de la página `x`




