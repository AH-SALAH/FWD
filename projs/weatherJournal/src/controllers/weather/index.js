import db from "../../db.js";

/**
 * @description local weather api router
 *
 * @returns {Object} - route object
 */
const weatherCtrl = () => {

    // Monday, 11 Jan 2021 from unix
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let todayDate = unix => new Date(unix * 1000 || Date.now()).toLocaleDateString('en-GB', dateOptions);

    return {
        root: {
            get(req, res) {
                // get all from db
                // resp
                res.json({ done: true, data: db });
            },
            getLast(req, res) {
                // get last from db
                // resp
                res.json({ done: true, data: db.sort((a, b) => b._id - a._id)[0] || null });
            },
            post(req, res) {
                // save in db
                // chk existance
                let exist = db.filter(obj => obj.zip === req.body.zip)[0];

                // if exit, should not duplicate
                if (exist) {
                    res.status(422).json({ done: false }).end();
                    return;
                }

                let date = todayDate(req.body.date);

                // save
                db.push({ ...req.body, date, _id: Date.now() });

                res.status(200).json({ done: true }).end();

            }
        }
    };
};

export default weatherCtrl;