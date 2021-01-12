/**
 * @description home router api
 *
 * @returns {Object} - route object
 */
const homeCtrl = () => {

    let todayYear = new Date().getFullYear();
    // Monday, 11 Jan 2021
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let todayDate = new Date().toLocaleDateString('en-GB', dateOptions);

    return {
        root: {
            get(req, res) {
                res.render('index', { title: 'Weather Journal', todayYear, todayDate });
            }
        }
    };
};

export default homeCtrl;