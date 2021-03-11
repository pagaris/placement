[Ver README en español](README.md)

# Pagaris Smart Button

This guide will help you add the Pagaris Smart Button to your online store, so you can show your buyers that they can use Pagaris to pay their purchase in monthly installments with any card, even a debit one.

This button shows general info. about Pagaris and can show examples of monthly installments plans for a given amount.

We recommend that you show the button in the following pages:

- Product
- Cart
- Checkout

## Support

If you have any questions or would like to get a referrer code, please contact us in the chat of our website ([pagaris.com](https://pagaris.com)), or send an email to info@pagaris.com. Also, feel free to open an issue in this repository.

# Demo

![Demo](demo/demo.gif)
See [demo/demo.html](demo/demo.html)

# Features

1. The button explains the buyer how Pagaris works, without disrupting their purchase experience
2. If an `amount` is given (e.g. unit price of a product or total of a cart):
  - It's validated to check if it can be financed by Pagaris. If it isn't nothing is shown.
  - One or more example loan offers can be shown
3. If a valid referrer (`ref`) is given, the shown content can include the merchant's name and logo
4. A (text) link can be shown instad of a button. It serves the same purpose as the button, i.e. it shows more info. about Pagaris when clicked.

# Usage

In each page or layout in which you want to show the button (e.g. "product", "cart" or "checkout"):

1. Add `<script src="https://cdn.jsdelivr.net/gh/pagaris/placement/src/pagaris_placement.js"></script>` to include the needed JS file
2. Add an `<pagaris-placement>` element where you wish to show the button. You can add one or more buttons per page (e.g. search page or category page with multiple products)
3. Add the `amount` attribute to specify the product price or cart total in MXN (Mexican pesos)
4. Add the `ref` attribute to add merchant branding to the added button and content. This will be assigned by Pagaris, so you can contact us by email or chat to help you

#### Example

```html
<script src="https://cdn.jsdelivr.net/gh/pagaris/placement/src/pagaris_placement.js" defer></script>
<pagaris-placement amount="5800.95" ref="[referrer code]">
</pagaris-placement>
```

### Format

If you want to show a link instead of a button, add the `format="light"` attribute to the `<pagaris-placement>` element. If this attribute is not included, or its value is different than `light`, a button will be shown (default behavior).

### Change amount dynamically

If the amount changes (e.g. buyer changed a product quantity or changes cart products), the amount attribute can be changed and the content will be updated automatically

```js
const pagaris = document.querySelector('pagaris-placement')
pagaris.amount = 9928
```

### Add new button dynamically

If you wish to add a new button, you can create a new `<pagaris-placement>` element.

```js
const pagaris = document.createElement('pagaris-placement')
pagaris.amount = 3991.99
pagaris.ref = 'ref'

document.querySelector('body').append(pagaris)
```

---

## Examples for different tech stacks

- [WooCommerce](https://github.com/pagaris/placement/wiki/Woocommerce)
- [Shopify](https://github.com/pagaris/placement/wiki/Shopify)
