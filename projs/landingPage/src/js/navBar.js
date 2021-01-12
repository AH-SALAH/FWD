/**
 *
 * @description Handle top nav
 * @author AH.SALAH
 * @export
 * @class NavBar
 */
export default class NavBar {
    
    constructor(prevPos = 0, navBar, maxScroll = 600) {
        this.prevPos = prevPos;
        this.maxScroll = maxScroll;
        this.navBar = navBar || document.querySelector('.page__header');
        this.navBarUl = document.querySelector('.navbar__list');
    }

    /**
     *
     * @description handle nav links click
     * @author AH.SALAH
     * @memberof NavBar
     */
    handleNavLinksClick() {
        // handle nav links click
        let navList = this.navBarUl.querySelectorAll('.navbar__list__a');
        navList.forEach(nav => {
            nav.addEventListener('click', function () {
                let section = document.querySelector('[data-nav=' + this.dataset.section + ']');
                section?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    /**
     * 
     * @description Fix Nav
     * @author AH.SALAH
     * @param {Number} [fixAfter=this.maxScroll] - scroll number in px default: 600
     * @memberof App
     */
    fixNavBar(fixAfter = this.maxScroll) {
        // window.onscroll = () => {
        let shouldBeVisible = window.scrollY > fixAfter;

        if (shouldBeVisible) {
            let currentVal = window.pageYOffset;

            if (currentVal > this.prevPos) {
                this.navBar.classList.add('hide__totop__light');
            }
            else {
                this.navBar.classList.remove('hide__totop__light');
                this.navBar.classList.add('bg-white');
            }
            this.prevPos = currentVal;
        }
        else {
            this.navBar.classList.remove('bg-white');
        }
        // }
    }

    // getWYPos(){
    //     return this.prevPos;
    // }

    /**
     *
     * @description init from outside
     * @author AH.SALAH
     * @static
     * @param {Number} prevPos
     * @param {Node} navBar
     * @param {Number} maxScroll
     * @returns class instance
     * @memberof NavBar
     */
    static initNavBar(prevPos, navBar, maxScroll) {
        let nav = new NavBar(prevPos, navBar, maxScroll);
        nav.fixNavBar(maxScroll);
        nav.handleNavLinksClick();
        return nav;
    }

}