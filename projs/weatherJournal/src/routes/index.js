import home from "./home/index.js";
import weather from "./weather/index.js";
/**
 * @description app routes
 *
 * @param {Object} app - app instance
 */
const routers = app => {

    // use home api router
    app.use('/', home);
    // use weather api router
    app.use('/weather', weather);

};

export default routers;
