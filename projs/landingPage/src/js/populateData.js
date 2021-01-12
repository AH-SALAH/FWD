import Layout from "_/js/layout";

/**
 *
 * @description - populating data to dom
 * @author AH.SALAH
 * @export
 * @class PopulateData
 */
export default class PopulateData {

    constructor() {
        this.appWrapper = document.querySelector('#app');
    }

    /**
     * @description Append static data to the dom
     *
     * @author AH.SALAH
     * @memberof App
     */
    populateData() {
        let frgmnt = document.createDocumentFragment();
        let div = document.createElement('div');
        let h1 = this.appWrapper.querySelector('h1');
        div.innerHTML = Layout();
        frgmnt.appendChild(div);
        this.appWrapper.removeChild(h1);
        this.appWrapper.appendChild(frgmnt);
    }

    static initData(){
        let instance = new PopulateData();
        instance.populateData();
    }

}