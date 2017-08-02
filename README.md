# Angular Universal Starter & Boilerplate

```sh
git clone git@github.com:S-Intelligent-Technologies/sit-ngx-starter.git
cd sit-ngx-starter
npm install
```

## Scripts
#### Development
```sh
npm run start
```

Without SSR:

```sh
npm run start:nossr
```

#### Production
##### Build
```sh
HOST_IP=http://sit-mena.com API_URL=http://api.sit-mena.com npm run build:prod # without SSR just use build:prod:nossr instead

```

##### Start server
```sh
PORT=8080 npm run serve:prod
```

You can specify your options before your build/start/serve scripts

`HOST_IP` defaults to localhost:3000

`API_URL` defaults to http://HOST_IP/api

`PORT` defaults to 3000

`NODE_ENV` defaults to development

`NO_SSR` defaults to false

#### Test & lint
##### unit tests and linting
```sh
npm run test
```
##### linting alone
```sh
npm run lint
```
##### format code
```sh
npm run prettify
```

Formatting is run automatically before commiting, and it stops the commit if your code contains formatting/linting errors. You can use `git commit -n` to commit without the format/lint checks. However it's preffered if you use fix the lint errors, or use [Tslint disable flags instead](https://palantir.github.io/tslint/usage/rule-flags/) on the culprit.

You can add more pre-commit scripts from package.json

## Repo and developing

// TODO
