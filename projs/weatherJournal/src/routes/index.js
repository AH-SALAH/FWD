import home from "./home/index.js";
import weather from "./weather/index.js";
/**
 * @description app routes
 *
 * @param {*} app - app instance
 */
const routers = app => {

    app.use('/', home);
    app.use('/weather', weather);

};

export default routers;
