# Weather Journal Project

...
### Documentation

- Open _docs/index.html

---
### Proj Structure

```
.
├── _docs
├── src
│   ├── bin
│   │   └── www.js ============> server runs
│   ├── controllers ===========> Ctrls to handle routes bussines
│   │   ├── home
│   │   │   └── index.js
│   │   └── weather
│   │       └── index.js
│   ├── public
│   │   ├── js
│   │   │   └── app.js =========> client js
│   │   ├── style
│   │   │   ├── scss
│   │   │   │   ├── bootstrap
│   │   │   │   ├── mdb.core.scss
│   │   │   │   └── mdb.free.scss
│   │   │   ├── app.css
│   │   │   ├── app.css.map
│   │   │   └── app.scss
│   │   └── favicon.ico
│   ├── routes
│   │   ├── home
│   │   │   └── index.js
│   │   ├── weather
│   │   │   └── index.js
│   │   └── index.js  =============> routes wrapper/collector
│   ├── views   ===================> hbs views
│   │   ├── layouts
│   │   │   └── layout.hbs
│   │   ├── partials
│   │   │   └── footer.hbs
│   │   ├── error.hbs
│   │   └── index.hbs
│   ├── app.config.js  ============> app config (e.g. cors() | view engine | global middleWare)
│   ├── app.js  ===================> app express instance
│   └── db.js  ====================> saves data as [{}]
├── .editorconfig
├── .gitattributes
├── .gitignore
├── jsdoc.conf.json
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```
---
## Techs/Dependancies:

- nodejs
- express
- express-generator
- openWeatherMap api
- scss,css
- js-es6
- jsdoc
- hbs
- mdb-ui-kit

---
## Build Setup

``` bash
# install dependencies
npm install/i

# start server on http://localhost:5000
npm start

```
