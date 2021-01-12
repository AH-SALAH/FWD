/**
 *
 * @description setup side nav indicators
 * @author AH.SALAH
 * @export
 * @class SideNavIndicator
 */
export default class SideNavIndicator {

    constructor(sections) {
        this.sideIndicators = document.querySelector('.side__indicators');
        this.mainTitle = document.querySelector('.main__title');
        this.sections = sections || document.querySelectorAll('section');
    }

    /**
     *
     * @description handle side indicator creation & populate to dom
     * @author AH.SALAH
     * @memberof App
     */
    handleSideIndicator() {
        let sideIndicUl = this.sideIndicators.querySelector('.side__indicators__ul');
        // get title as pairs
        let titlePairs = this.mainTitle.textContent.split('').map((val, i, arr) => { if (i % 2 === 0) return arr.slice(i, i + 2) }).filter(t => t).map(t => t.join(''));
        let frgmnt = document.createDocumentFragment();
        // create li & text
        titlePairs?.map(t => {
            let li = document.createElement('li');
            let txt = document.createElement('h4');
            li.classList.add('side__indicators__li');
            txt.classList.add('side__indicators__letter', t);

            this.sections.forEach(s => {
                if (s.getAttribute('data-nav').startsWith(t)) txt.setAttribute('data-section', s.getAttribute('data-nav'));
            });

            txt.textContent = t;
            li.appendChild(txt);

            frgmnt.appendChild(li);
        });
        // append to dom ul
        sideIndicUl.appendChild(frgmnt);
    }

    /**
     *
     * @description handle indicators clicks
     * @author AH.SALAH
     * @memberof SideNavIndicator
     */
    handleIndicatorsClick() {
        // handle side indicators click
        let sideIndic = this.sideIndicators.querySelectorAll('.side__indicators__letter');
        sideIndic.forEach(s => {
            s.addEventListener('click', function () {
                let section = document.querySelector('[data-nav=' + this.dataset.section + ']');
                section?.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    /**
     *
     * @description init sideNaveIndicator
     * @author AH.SALAH
     * @static
     * @param {NodeList} sections
     * @memberof SideNavIndicator
     */
    static initSideNavIndicator(sections) {
        let instance = new SideNavIndicator(sections);
        instance.handleSideIndicator();
        instance.handleIndicatorsClick();
    }

}