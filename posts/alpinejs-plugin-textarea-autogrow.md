---
title: How to Autogrow Textarea with Alpine JS (+ New Plugin)
description: Easily create an autogrowing textarea with Alpine JS.
date: 2022/06/10
tags: [alpinejs, javascript]
---

At some point in your development career you will most likely be asked to make a `<textarea>` autogrow with the value that the user has inputted.

There are a few approaches you can take when creating this functionality but the most common is a JavaScript function similair to this.

```js
function textareaAutogrow() {
  let el = event.currentTarget

  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}
```

It's simple, clean and easy to use.

How do we take this and translate it to Alpine JS?

Let's start with a solution that uses the same code as the JavaScript example, but written with Alpine JS.

## Basic Alpine JS Example

```html
<textarea
  x-data="{
    resize: () => {
      $el.style.height = 'auto';
      $el.style.height = `${$el.scrollHeight}px`
    }
  }"
  x-init="resize()"
  @input="resize()"
></textarea>
```

What's happening here?

We have the `x-data` context initialising a `resize()` function which has the same logic as our JavaScript example. This function is then called when the Alpine JS component initialises and again everytime the `input` DOM event is dispatched.

Great, this works but does it tick the three boxes of the JavaScript example?

**Simple**

Yes. It's standard Alpine JS, minus the creation of a function in an x-data context.

**Clean**

No. It's added a extra complexity and bloat to your HTML which makes it much harder to quickly read through.

**Reusable/Easy**

No. It's not DRY and that's not something I'd want to be using, especially in HTML where things can often change.

## Extracting Alpine JS Logic Example

Let's take the logic we just wrote and extract it into it's own Alpine JS data context function. Here's what that would look like.

```html
<textarea x-data="grow"></textarea>
```

And the Alpine JS directive.

```js
document.addEventListener('alpine:init', () => {
  Alpine.data('grow', () => ({
    init() {
      this.resize()
      this.$el.addEventListener('input', () => this.resize())
    },
    resize() {
      this.$el.style.height = 'auto'
      this.$el.style.height = `${this.$el.scrollHeight}px`
    },
  }))
})
```

This looks much better!

Handling it with this approach allows us to add `x-data="grow"` without having to write the functionality over and over again. However... Let's take the following example.

```html
<textarea
  x-data="{ valid: false, grow }"
  :class="{ 'border-green-500': valid }"
></textarea>
```

Here we have a `valid: false` which handles adding/removing a CSS class.

Will the CSS work? Yes.

Will the autogrow functionality work? No.

There's probably a way to fix this, but for now I have a different solution.

## Alpine JS Plugin Example

I've created an Alpine JS plugin called [Alpine JS Textarea Autogrow](https://github.com/markmead/alpinejs-textarea-autogrow) that handles this functionality with an Alpine JS directive.

What this means is we can add this functionality like this.

```html
<textarea x-data x-grow></textarea>
```

Here we are initialising an Alpine JS component with `x-data` which is required to initialise the Alpine JS component. We then use `x-grow` which is an Alpine JS directive provided by the plugin to handle the autogrow functionality.

Under the hood `x-grow` is the JavaScript example showcased at the start of this blog post.

Something to ask is "Why would I use a plugin for something like this?" which is a great question. Here's some reasons.

- Simple, clean and easy to use
- No HTML bloat
- Very small JavaScript package (0.000344 MB)
- Allows for full use of `x-data`

All of these examples have their use cases, but if I were to create a list of best to worst approaches it would be.

1. Alpine JS Plugin - [Alpine JS Textarea Autogrow](https://github.com/markmead/alpinejs-textarea-autogrow)
2. Extracting Alpine JS Logic
3. JavaScript
4. Basic Alpine JS
