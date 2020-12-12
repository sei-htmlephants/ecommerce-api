# Sample Curl Scripts

## Authentication

Sign In

```sh
EMAIL="a@a.com" PASSWORD="a" sh curl-scripts/auth/sign-in.sh
```

Sign Out

```sh
TOKEN=53fa9f21d13bd4g09fdb163c7c9acf65 sh curl-scripts/auth/sign-out.sh 
```

## Products

Create Product

```sh
TOKEN=53fa9f21d13bd4g09fdb163c7c9acf65 NAME="Thing" DESC="some details" PRICE="99" CLASS="market" CAT="Cameras" IMG="someurl" sh curl-scripts/product/create.sh 
```

## Purchases

Create Purchase

```sh
TOKEN=53fa9f21d13bd4g09fdb163c7c9acf65 PRODUCT="Thing" PRICE="99" sh curl-scripts/purchase/create.sh 
```
