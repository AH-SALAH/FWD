/**
 *
 * @description Handle scroll to top
 * @author AH.SALAH
 * @export
 * @class ScrollToTop
 */
export default class ScrollToTop {

    constructor(scrollToTopBtn, maxScroll = 600) {
        this.scrollToTopBtn = scrollToTopBtn || document.querySelector('.totop');
        this.maxScroll = maxScroll;
    }

    /**
     *
     * @description handle scroll Callback/listener
     * @author AH.SALAH
     * @param {Number} [showAfter=this.maxScroll]
     * @memberof ScrollToTop
     */
    handleScrollCb(showAfter = this.maxScroll) {
        let shouldBeVisible = window.scrollY > showAfter;
        this.animateDocToTop(shouldBeVisible);
    }

    /**
     * animate dom to top
     *
     * @author AH.SALAH
     * @param {boolean} [shouldBeVisible=false]
     * @returns {void}
     * @memberof App
     * @description animate dom to top
     */
    animateDocToTop(shouldBeVisible = false) {
        if (shouldBeVisible === undefined || shouldBeVisible === null) return;

        if (shouldBeVisible) {
            this.scrollToTopBtn.classList.add('slideFromBottom');
        } else {
            this.scrollToTopBtn.classList.remove('slideFromBottom');
        }
    }

    /**
     *
     * @description Scroll to Top
     * @author AH.SALAH
     * @memberof App
     */
    scrollToTop(showAfter) {
        // handle totop btn click
        this.scrollToTopBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        this.handleScrollCb(showAfter);
    }

    /**
     *
     * @description return new instance from self
     * @author AH.SALAH
     * @static
     * @param {Node} scrollBtn
     * @param {Number} maxScroll
     * @returns new instance
     * @memberof ScrollToTop
     */
    static initToTop(scrollBtn, maxScroll) {
        let toTop = new ScrollToTop(scrollBtn, maxScroll);
        toTop.scrollToTop(maxScroll);
        return toTop;
    }
}