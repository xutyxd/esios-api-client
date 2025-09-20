# ESIOS Api Client

This is a another implementation of the ESIOS REE API.

## Installation

```bash
$ npm install esios-api-client
```

## Usage

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

