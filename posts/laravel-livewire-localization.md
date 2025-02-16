---
title: How to Fix Livewire Ignoring Localization in Routes
description: How you can fix Livewire ignoring your localized routes.
date: 2022/05/25
tags: [laravel, livewire]
---

Recently, I have been working on a Laravel website using the TALL stack that
requires different locales. These locales are specific to different URLs, such
as:

- `en-gb` (UK/International)
- `en-au` (Australia)
- `en-us` (USA)

The project uses a config file `sites.php` to manage data for each site that
can't be managed from translation files. This data can be accessed through a
custom facade:

```php
LocaleSettings::get('default_currency');
```

Under the hood this is doing:

```php
return config('sites')[app()->getLocale()][$key];
```

For each of these locales we have different currencies.

| Route | Currencies         | Default |
| ----- | ------------------ | ------- |
| en-gb | GBP, USD, ZAR, EUR | GBP     |
| en-au | AUD, USD           | AUD     |
| en-us | USD, GBP           | USD     |

When a currency or locale is changed, the cart and product components on the
page will be refreshed to show the correct price for that currency.

This works fine when changing the currency through Livewire.

![alt text](/og.jpg)

However, when switching the locale it sets the currency to the default currency
which works fine on initial load, but when Livewire does a POST request when a
component updates, for example when adding to the cart, it resets back to the
fallback currency of GBP.

This is because the locale in the route is being changed, which is caused by
Livewire not using localized routes when doing the POST request to the server.

For this I created a new middleware called `LocalizationLivewire` with the
following code:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LocalizationLivewire
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->route()->getName() === 'livewire.message') {
            app()->setLocale($request->request->get('fingerprint')['locale']);

            return $next($request);
        }

        return $next($request);
    }
}
```

And added this above my `Localization` middleware in the `Kernel.php`.

This middleware checks if the route name is `livewire.message` which is the
route name for Livewire POST request when components update.

It then sets the app locale to the value of the locale in the fingerprint on the
request. If you're not sure what the fingerprint is, then here's a snippet from
Caleb Porzio's blog
[How Livewire Works (a deep dive)](https://calebporzio.com/how-livewire-works-a-deep-dive).

> This is data associated with a component that makes it unique and provides
> essential non-changing information about it.

```json
"fingerprint": {
  "id": "44Njb4Yue0jBTzpzRlUf",
  "name": "counter",
  "locale": "en",
  "path": "",
  "method": "GET"
},
```

And that's basically that, it worked as expected from there out. Such an easy
fix after hours (and I mean hours) of banging my head against the wall.
