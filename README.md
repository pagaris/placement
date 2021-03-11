[See README in English here](README.en.md)

# Botón Inteligente de Pagaris

Esta guía te ayudará a agregar el Botón Inteligente de Pagaris a tu tienda en línea, para mostrar a tus compradores que pueden usar Pagaris para pagar su compra a meses con cualquier tarjeta, incluso si es de débito.

Este botón muestra información general de Pagaris, y puede cotizar las opciones de pagos mensuales para la cantidad en cuestión.

Te recomendamos que muestres el botón en las siguientes páginas:

- Producto
- Carrito de compras
- Checkout

## Soporte

Si tienes dudas o deseas obtener un código de referente, contáctanos en el chat de nuestro sitio ([pagaris.com](https://pagaris.com)), o con un mail a info@pagaris.com. También puedes abrir un Issue en este repositorio.

# Demo

![Demo](demo/demo.gif)
Ver [demo/demo.html](demo/demo.html)

# Funciones

1. El botón mostrado en tu página le explica a un comprador cómo funciona Pagaris, sin romper la experiencia de compra.
2. Si se agrega un monto (ej. precio unitario de un producto o total de un carrito):
  - Se puede validar si es un monto que podría financiarse en Pagaris. Si no lo es, no se muestra nada
  - Se puede dar una cotización que ejemplifica cómo podría quedar un crédito en Pagaris para este monto
3. Si se agrega un código de referente, el contenido mostrado puede incluir branding del comercio
4. Puede mostrarse un link (texto) en lugar de un botón. Cumple la misma función de explicar Pagaris al hacer clic.

# Uso

Para cada página o layout (ej. "producto", "carrito" o "checkout") en la que desees mostrar el botón de Pagaris:

1. Agrega `<script src="https://cdn.jsdelivr.net/gh/pagaris/placement/src/pagaris_placement.min.js"></script>` para incluir el archivo JS necesario.
2. Agrega el elemento `<pagaris-placement>` donde desees que se agregue el botón de Pagaris. Se pueden agregar uno o múltiples botones en una página (ej. para una página de búsqueda o de categoría en donde aparecen múltiples productos)
3. Agrega el atributo `amount` que especifique el monto del producto o carrito en pesos
4. Agrega el atributo `ref` para que el contenido esté brandeado con el nombre y logo de tu comercio. Este será asignado por Pagaris. Puedes contactarnos por email o chat para revisarlo.

#### Ejemplo

```html
<script src="https://cdn.jsdelivr.net/gh/pagaris/placement/src/pagaris_placement.js" defer></script>
<pagaris-placement amount="5800.95" ref="[código de referente asignado]">
</pagaris-placement>
```

### Formato

Si deseas mostrar un link en lugar de un botón, puedes agregar el atributo `format="light"` al elemento `<pagaris-placement>`. Si no se incluye este atributo o su valor es distinto a `light`, se mostrará un botón (comportamiento por defecto).

### Cambiar monto dinámicamente

Si de manera dinámica el monto cambia (por ejemplo, si el comprador aumenta la cantidad de producto o cambia los productos del carrito), puedes cambiar el monto del botón y se actualizará automáticamente

```js
const pagaris = document.querySelector('pagaris-placement')
pagaris.amount = 9928
```

### Agregar nuevo botón dinámicamente

Si se desea agregar un botón de Pagaris nuevo, puede hacerse creando un nuevo elemento `<pagaris-placement>`

```js
const pagaris = document.createElement('pagaris-placement')
pagaris.amount = 3991.99
pagaris.ref = 'ref'

document.querySelector('body').append(pagaris)
```

---

## Ejemplos para diferentes tecnologías

- [WooCommerce](https://github.com/pagaris/placement/wiki/Woocommerce)
- [Shopify](https://github.com/pagaris/placement/wiki/Shopify)
