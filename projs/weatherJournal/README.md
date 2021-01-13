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
│   │   └── www.js ============> server runs & listen
│   ├── controllers ===========> Ctrls to handle routes bussines
│   │   ├── home
│   │   │   └── index.js ======> home page controler
│   │   └── weather
│   │       └── index.js ======> weather api controler
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
│   │   │   └── app.scss =========> app main scss/css folder
│   │   └── favicon.ico
│   ├── routes
│   │   ├── home
│   │   │   └── index.js ==========> home api router
│   │   ├── weather
│   │   │   └── index.js ==========> weather api router
│   │   └── index.js  =============> routes wrapper/collector that use all routes for app routers
│   ├── views   ===================> hbs views
│   │   ├── layouts
│   │   │   └── layout.hbs ========> main layout html
│   │   ├── partials
│   │   │   └── footer.hbs ========> html footer
│   │   ├── error.hbs =============> error page
│   │   └── index.hbs =============> main app page
│   ├── app.config.js  ============> app config (e.g. cors() + view engine + global middleWare) setup
│   ├── app.js  ===================> app express instance start
│   └── db.js  ====================> in db saves data as [{}]
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
