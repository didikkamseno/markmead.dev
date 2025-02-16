---
title: How to Clear the Shopify Cart with Alpine JS
description:
  Find out how to clear the Shopify cart with Alpine JS and the Shopify API.
date: 2021/12/10
tags: [alpinejs, javascript, shopify, api]
---

Recently, I've been using a lot of Alpine JS when developing Shopify themes and
so far it's worked very well.

Thanks to the latest version of Alpine JS (version 3) we now have access to
Alpine JS stores by default! 🥳

[Alpine JS Stores Documentation](https://alpinejs.dev/globals/alpine-store)

This means that we can create a source of truth for particular state management,
in this case the Shopify cart.

Let's create a new Alpine JS store called "cart" that we will place in either
`assets/theme.js` or `layouts/theme.liquid`.

_If you are using `assets/theme.js` then you will need to import Alpine JS as a
module._

Here's our Alpine JS store for the cart.

```js
Alpine.store('cart', {
  data: null,

  clearCart() {
    fetch('/cart/clear.js, { method: 'POST' })
      .then((response) => response.ok && this.getCart())
  },

  getCart() {
    fetch('/cart.js')
      .then((response) => response.json())
      .then((data) => this.data = data)
      .catch((error) => console.error(error))
  }
})
```

Let's breakdown what this is doing.

| ID          | Type     | Description                                               |
| ----------- | -------- | --------------------------------------------------------- |
| `data`      | Variable | Keeps all the cart data that is set from `getCart`        |
| `clearCart` | Function | Clears the cart and then calls `getCart` once finished    |
| `getCart`   | Function | Gets the current cart and saves it to the `data` variable |

Once question you might have is why do we call `getCart` after clearing? This is
so we can reset the `data` variable.

There's another approach to doing this with `response.ok && this.cart = null`
but the approach is your choice, they're both very quick.

The last part is the HTML, thankfully Alpine JS exposes the store in a `$store`
variable. Therefore, we can create a button that clears the cart with the
following code.

```html
<button x-data type="button" @click="$store.cart.clearCart">Clear Cart</button>
```

And that's that. You can now take `$store.cart.clearCart` and place that where
you need to clear the cart in your Shopify store.

_If the clear cart button is within a `form` then you'll need to add
`type='button'` to the button to prevent it from submitting the form._

If you are using this on the cart page or within a cart popup/drawer then you'll
want to handle the UI to show the user that the cart has been emptied.
