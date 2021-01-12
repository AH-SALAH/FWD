/**
 * @author AH.SALAH
 * @email https://github.com/AH-SALAH
 * @create date 2020-12-22 03:33:35
 * @modify date 2020-12-22 03:35:15
 * @desc app.js
 */

// ==================================
// import all files from a dir that match regex
import { importAll } from "_/js/utils/importAllFiles";
//================================
// import all imgs
importAll(require.context('_/assets/img/', true, /\.(png|jpe?g|gif|svg)$/));

// import front-end compliment files
importAll(require.context('_/public/', true, /(\.(ico|txt|xml|htaccess|webmanifest)?$|^.*(android|apple|favicon|safari|tile|mstile).*$)/));

// //import fonts files
// importAll(require.context('@fortawesome/fontawesome-free/webfonts', true, /\.(woff(2)?|ttf|eot)(?=\?[A-Za-z0-9])?$|\.svg$/));

//================================
//import dependancies
//================================
// Import Bootstrap’s JavaScript
// import "bootstrap";

//// Alternatively, you may import plugins individually as needed:
// import 'bootstrap/js/dist/util';
import "bootstrap/js/dist/button";
import "bootstrap/js/dist/collapse";

//================================
// Note: Importing bootstrap to get a quick style boost
//=================================

// import needed modules
//================================
import PopulateData from "_/js/populateData";
import SectionsObserver from "_/js/sectionsObserver";
import ScrollToTop from "_/js/scrollToTop";
import NavBar from "_/js/navBar";
import SideNavIndicator from "_/js/sideNavIndicator";
// import scss
import "_/style/scss/app.scss";

/*******************************************************************************/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ███████╗████████╗ █████╗ ██████╗ ████████╗     █████╗ ██████╗ ██████╗          ██╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗         ██║██╔════╝
// ███████╗   ██║   ███████║██████╔╝   ██║       ███████║██████╔╝██████╔╝         ██║███████╗
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██╔══██║██╔═══╝ ██╔═══╝     ██   ██║╚════██║
// ███████║   ██║   ██║  ██║██║  ██║   ██║       ██║  ██║██║     ██║         ╚█████╔╝███████║
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝          ╚════╝ ╚══════╝
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*******************************************************************************/
// start app

/**
 *
 * @author AH.SALAH
 * @class App
 */
class App {

    /**
     *
     * @description init app
     * @author AH.SALAH
     * @static
     * @returns app instance
     * @memberof App
     */
    static init() {
        let app = new App();

        PopulateData.initData();
        
        let navInstance = NavBar.initNavBar();
        let toTopInstance = ScrollToTop.initToTop();
        
        window.onscroll = () => {
            navInstance.fixNavBar();
            toTopInstance.handleScrollCb();
        };
        
        SideNavIndicator.initSideNavIndicator();
        SectionsObserver.initSectionsObserver();
        
        return app;
    }

}

// start
App.init();