<p align="left">
    <img src="https://img.shields.io/npm/dw/esios-api-client">
    <img alt="NPM Unpacked Size" src="https://img.shields.io/npm/unpacked-size/esios-api-client">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/esios-api-client">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/esios-api-client">
</p>

# ESIOS Api Client

This is a another implementation of the ESIOS REE API.

## Installation

```bash
$ npm install esios-api-client
```

## Usage

### Authentication

You should get an API key from sending a email to [consultasios@ree.es](consultasios@ree.es).
Check the [documentation](https://api.esios.ree.es/doc/index.html) for more information.

This package could be used without authentication, but it is recommended to use it.

```ts
import { ESIOSApiClient } from 'esios-api-client';
// Instance the api client
const client = new EsiosApiClient();
// Set the API key
client.auth.set('YOUR_API_KEY');
```

### Archives

#### PVPC

Get the PVPC for a specific date.

```ts
import { ESIOSApiClient } from 'esios-api-client';
// Instance the api client
const client = new EsiosApiClient();
// Get PVPC for today
const pvpc = await client.archives.pvpc(new Date());
// Get information for Peninsula, Canarias and Baleares
const general = pvpc.general;
// Get information for Ceuta and Melilla
const special = pvpc.special;
// Get specific information for hour
const midnight = pvpc.special.hour[0];
```

### Indicators

#### PVPC

Get the PVPC for a specific date.

```ts
import { ESIOSApiClient } from 'esios-api-client';
// Instance the api client
const client = new EsiosApiClient();
// Get PVPC for today
const pvpc = await client.indicators.pvpc(new Date(), Geo.PENINSULA);

console.log(pvpc);
```

#### Spot

Get the spot for a specific date.

```ts
import { ESIOSApiClient } from 'esios-api-client';
// Instance the api client
const client = new EsiosApiClient();
// Get spot for today
const spot = await client.indicators.spot(new Date(), Geo.ES);

console.log(spot);
```

#### Not implemented indicators

Optionally, you can get indicator with it ID not implemented in this package.

```ts
import { ESIOSApiClient } from 'esios-api-client';
// Instance the api client
const client = new EsiosApiClient();
// Get IT for today
const indicator = await client.indicators.it('1001', new Date(), Geo.ES);

console.log(indicator);
```