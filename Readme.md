# Overview
This small example show how to implement authentication using JWT together with NestJS and shows you how to secure a REST endpoint and also GraphQL.

For JWT we used RSA256 with JWKS.

Everything is stored on a mongodb.

# Requirements
You need to have a local mongodb running that accepts connections on localhost standard port.
If not, you need to modify `ormconfig.json`.

# How to execute
To run it just clone this repository and execute:
```
npm i
npm run createkeypair
npm run start:dev
```
