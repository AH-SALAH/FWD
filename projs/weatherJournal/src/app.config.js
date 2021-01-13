import { fileURLToPath } from 'url';
import createError from "http-errors";
import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";
import hbs from "express-handlebars";

import routers from "./routes/index.js";

/**
 * @description app Config
 *
 * @param {*} app
 */
const appConfig = app => {
    
    // instead of commonjs node __dirname which is not available in esModules types
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // disable x powered
    app.disable('x-powered-by');
    
    // view engine setup
    app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'layout'}));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', '.hbs');

    // middlewares setup
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    // sass middleware
    app.use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: false
    }));
    // static folder serving
    app.use(express.static(path.join(__dirname, 'public')));

    // use routers
    routers(app);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

};

export default appConfig;