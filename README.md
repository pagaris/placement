[English docs](README.en.md)

Botón (widget) de Pagaris que puede ser agregado a sitios web (ej. en una página de producto o de checkout) para mostrar a compradores que pueden usar Pagaris para pagar su compra a meses.

# Demo

[TODO]

# Funciones

1. El botón mostrado en tu página le explica a un comprador cómo funciona Pagaris, sin romper la experiencia de compra.
2. Si se agrega un monto (ej. precio unitario de un producto o total de un carrito):
  - Se puede validar si es un monto que podría financiarse en Pagaris. Si no lo es, no se muestra nada
  - Se puede dar una cotización que ejemplifica cómo podría quedar un crédito en Pagaris para este monto
3. Si existe y se agrega un referente, el contenido mostrado puede incluir branding del comercio

# Uso

Para cada página o layout (ej. "producto", "carrito" o "checkout") en la que desees mostrar el botón de Pagaris:

1. Agrega `<script src=[TODO]>` para incluir el archivo de Javascript necesario
2. Agrega el elemento `<pagaris-placement>` donde desees que se agregue el botón de Pagaris. Se pueden agregar uno o múltiples botones en una página (ej. para una página de búsqueda o de categoría en donde aparecen múltiples productos)
3. Agrega el atributo `amount` que especifique el monto del producto o carrito en pesos
4. Agrega el atributo `ref` para que el contenido esté brandeado con el nombre y logo de tu comercio. Este será asignado por Pagaris, puedes contactarnos por email o chat para revisarlo.

#### Ejemplo

```html
<script src="[TODO]" defer></script>
<pagaris-placement amount="5800.95" ref="[código de referente asignado]">
</pagaris-placement>
```

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
