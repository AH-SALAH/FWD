import { io } from "_/js/utils/intersectionObserver";

/**
 *
 * @author AH.SALAH
 * @export
 * @class SectionsObserver
 */
export default class SectionsObserver {

    constructor() {
        this.html = document.querySelector('html');
        this.body = this.html.querySelector('body');
        this.appWrapper = this.body.querySelector('#app');

        this.navBarUl = this.appWrapper.querySelector('.navbar__list');
        this.navBarIndicator = this.appWrapper.querySelector('.navLink__indicator');
        this.sideIndicators = this.appWrapper.querySelector('.side__indicators');
        this.sections = this.appWrapper.querySelectorAll('section');
        this.headerLayerCrcle = this.appWrapper.querySelector('.circle__layer');
        this.sectionBackground = (ratio) => `linear-gradient(45deg, rgba(255, 255, 230, ${ratio}) 30%, rgba(255, 55, 55, ${ratio}) 100%)`;
    }

    /**
     * 
     * @description Handle nav indicator position
     * @author AH.SALAH
     * @param {Object} - { w = 0, h = 0, l = 0, t = 0 } - width|hight|left|top
     * @memberof App
     */
    handleNavIndicator({ w = 0, h = 0, l = 0, t = 0 }) {
        this.navBarIndicator.style.width = w + 'px';
        this.navBarIndicator.style.height = h + 'px';
        this.navBarIndicator.style.left = l + 'px';
        this.navBarIndicator.style.top = t + 'px';
    }

    /**
     *
     * @description sections IObserver handler
     * @author AH.SALAH
     * @param {Array} entries
     * @param {Object} self
     * @memberof App
     */
    sectionsObserverHandler(entries, self) {
        entries.forEach((entry, i) => {
            // set style for intersected section
            let trgt = entry.target.querySelector('.landing__container');
            entry.target.style.background = this.sectionBackground(entry.intersectionRatio);
            trgt.style.opacity = entry.intersectionRatio;
            entry.target.classList.add('active');

            // navbar nav query
            let navLink = this.navBarUl.querySelector('.' + entry.target.dataset.nav);
            let currentActiveNavLink = this.navBarUl.querySelector('.navbar__list__a.active');
            
            // sidenav indicator query
            let sideIndicNavLink = this.sideIndicators.querySelector('[data-section=' + entry.target.dataset.nav + ']');
            let currentActivesideIndicNavLink = this.sideIndicators.querySelector('.side__indicators__letter.active');

            if (entry.isIntersecting && entry.intersectionRatio > 0.7) {

                // set indicator pos
                this.handleNavIndicator({
                    w: navLink.clientWidth,
                    h: navLink.clientHeight,
                    l: navLink.offsetLeft,
                    t: navLink.offsetTop,
                });
                // set active nav link
                currentActiveNavLink?.classList.remove('active', 'text-white');
                navLink?.classList.add('active', 'text-white');
                // set active side indicator nav link
                currentActivesideIndicNavLink?.classList.remove('active');
                sideIndicNavLink?.classList.add('active');

                this.headerLayerCrcle.style.clipPath = 'circle(25%)';
                this.headerLayerCrcle.style.opacity = entry.intersectionRatio;
                this.headerLayerCrcle.style.backgroundColor = '#fff';

            }

            // reset things back
            if (entry.isIntersecting && entry.intersectionRatio <= 0.1) {

                entry.target.classList.remove('active');
                navLink?.classList.remove('active', 'text-white');

                sideIndicNavLink?.classList.remove('active');

                this.headerLayerCrcle.style.clipPath = 'circle(100%)';
                this.headerLayerCrcle.style.backgroundColor = 'crimson';
                // this.headerLayerCrcle.style.borderWidth = 220+'px';

                if (window.scrollY <= 50) {
                    // reset nav indicator for nothing if we get out of sections view
                    this.handleNavIndicator({
                        w: navLink.clientWidth,
                        h: navLink.clientHeight,
                        l: navLink.offsetLeft,
                        t: -100,
                    });
                }
            }
        });
    }

    /**
     *
     * @description initialize intersection observer to watch sections while intersect into viewport
     * @author AH.SALAH
     * @returns the intersection observer instance
     * @memberof App
     */
    ObserveSections() {
        let ioInstance = io(
            {
                config: { rootMargin: '16px' },
                target: this.sections,
                callbackHandler: (entries, self) => this.sectionsObserverHandler(entries, self)
            }
        );
        return ioInstance;
    }

    /**
     *
     * @description Observe intersections of the sections
     * @author AH.SALAH
     * @static
     * @returns class instance
     * @memberof SectionsObserver
     */
    static initSectionsObserver(){
        let instance = new SectionsObserver();
        instance.ObserveSections();
        return instance;
    }
}