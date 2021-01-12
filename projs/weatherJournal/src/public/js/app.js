/**
 * @description client weather module
 *
 */
const WeatherJ = function () {
    // local client host
    this.host = `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`; // http://localhost:port

    // Personal API Key for OpenWeatherMap API
    this.apis = function () {
        return {
            apiK: "14aa9a6c481d53d2fbbfc9ea2ce4195c",
            apiUrl: "https://api.openweathermap.org/data/2.5/weather",
            weather: this.host + '/weather'
        };
    };

    // compose the api service url
    this.composedApiServiceUrl = (baseUrl, zip, apik) => `${baseUrl}?zip=${zip}&units=metric&appid=${apik}`;

    // cache vars
    this.cachedVars = () => {
        return {
            form: document.querySelector('.weather-form'),
            zipEle: document.querySelector('.weather-form #zip'),
            zipErrEle: document.querySelector('.weather-form .invalid-feedback.zip-err'),
            feelingsEle: document.querySelector('.weather-form #feelings'),
            feelingsErrEle: document.querySelector('.weather-form .invalid-feedback.feeling-err'),
            dateEle: document.querySelector('.weather-form #date .date__text'),
            tempIconEle: document.querySelector('.weather-form #temp .temp-icon'),
            tempEle: document.querySelector('.weather-form #temp'),
            tempEleText: document.querySelector('.weather-form #temp .temp__text'),
            zipcodeEle: document.querySelector('.weather-form #zipCode .zipCode__text'),
            zipcodeEle: document.querySelector('.weather-form #zipCode .zipCode__text'),
            contentEle: document.querySelector('.weather-form #content .content__text'),
            entryHolderEle: document.querySelector('.weather-form #entryHolder'),
            generateBtn: document.querySelector('#generate'),
            generateBtnSpinner: document.querySelector('#generate .spinner'),
            errsEl: document.querySelector('.weather-form .errs'),
        };
    };

    // simple arr validation
    this.validate = eles => {
        const errs = [];
        if (!Array.isArray(eles) && !eles[0].node && !eles[0].msg) return;
        for (const el of eles) {
            if (!el.node.value) errs.push({ node: el.node.name || el.node.id, msg: el.msg || 'Invalid input' });
            if (el.regex && !el.regex.test(el.node.value)) {
                let nd = errs.filter(n => n.node === el.node.name || el.node.id);
                if (nd.length) nd.msg = nd.msg + ' & ' + el.regexMsg || "Incorrect Value";
                else errs.push({ node: el.node.name || el.node.id, msg: el.regexMsg || 'Incorrect Value' });
            }
        }

        return errs;
    };

    // validate form & handle its ui
    this.handleFormValidation = () => {
        const { zipEle, feelingsEle, form, zipErrEle, feelingsErrEle } = this.cachedVars();

        const errs = this.validate(
            [
                { node: zipEle, msg: "Please Add Zip Value!", regex: /^\d+$/mi },
                { node: feelingsEle, msg: "Please Add Feeling Value!" }
            ]
        );

        if (errs.length) {
            form.classList.remove('was-validated');
            errs.map(er => {
                if (er.node === 'zip') {
                    zipErrEle.innerHTML = er.msg;
                    zipEle.classList.add('is-invalid');
                    form.classList.add('was-validated');
                }
                else {
                    zipEle.classList.remove('is-invalid');
                }
                
                if (er.node === 'feelings') {
                    feelingsErrEle.innerHTML = er.msg;
                    feelingsEle.classList.add('is-invalid');
                    form.classList.add('was-validated');
                }
                else {
                    feelingsEle.classList.remove('is-invalid');
                }
            });

            return errs;
        }
        else {
            form.classList.remove('was-validated');
            zipEle.classList.remove('is-invalid');
            feelingsEle.classList.remove('is-invalid');

            return false;
        }
    };

    // http client
    this.http = async (url = '', method = 'GET', data = null) => {
        if (!url) return console.log("No URL to fetch!");

        let options = data ? { method, body: JSON.stringify(data), headers: { "Content-Type": "application/json" } } : { method };

        try {
            const resp = await (await fetch(url, options)).json();

            if (resp.cod === '404') {
                this.handleLoadingBtn(false);
                let { errsEl } = this.cachedVars();
                errsEl.innerHTML = resp.message;
                let tt = setTimeout(() => {
                    errsEl.innerHTML = '';
                    clearTimeout(tt);
                }, 3000);

                return;
            }

            return resp;

        } catch (error) {
            console.log(error);
            this.handleLoadingBtn(false);
            let { errsEl } = this.cachedVars();
            errsEl.innerHTML = error.message;
            let tt = setTimeout(() => {
                errsEl.innerHTML = '';
                clearTimeout(tt);
            }, 3000);
            return error;
        }
    };

    // Update ui handler
    this.updateUi = function ({ date, temp, feeling, zip, icon }) {
        const { form, dateEle, tempEleText, tempEle, contentEle, tempIconEle, zipcodeEle, entryHolderEle, feelingsEle, zipEle } = this.cachedVars();
    
        dateEle.innerHTML = date || dateEle.innerHTML;
        tempEleText.innerHTML = Math.round(temp) + '°' ?? tempEleText.innerHTML;
        contentEle.innerHTML = feeling || contentEle.innerHTML;
        zipcodeEle.innerHTML = zip || zipcodeEle.innerHTML;
    
        // empty form
        zipEle.value = '';
        feelingsEle.value = '';
    
    
        document.querySelector('.weather-form .newIcon')?.remove();
    
        tempIconEle.classList.add('d-none');
    
        let img = document.createElement('img');
        let newIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        img.style.width = '30px';
        img.style.height = '30px';
        img.classList.add('newIcon');
        img.setAttribute('src', newIcon);
    
        tempEle.prepend(img);
    
        entryHolderEle.classList.remove('d-none');
    };

    // handle loading btn
    this.handleLoadingBtn = function (loading) {
        const { generateBtn, generateBtnSpinner } = this.cachedVars();
        if (loading) {
            generateBtn.setAttribute('disabled', loading);
            generateBtnSpinner.classList.remove('d-none');
        }
        else {
            generateBtn.removeAttribute('disabled');
            generateBtnSpinner.classList.add('d-none');
        }
    };
    
    /* Function called by event listener */
    this.handleBtnClick = async function (e) {
        e.preventDefault();
        e.stopPropagation();
    
        this.handleLoadingBtn(true);
    
        const { zipEle, feelingsEle } = this.cachedVars();
        const { apiK, apiUrl, weather } = this.apis();
    
        // chk validation errs
        const errs = this.handleFormValidation();
    
        if (errs) {
            this.handleLoadingBtn(false);
            return;
        }
    
        try {
            let remoteApiResp = null,
                localApiResp = null;
    
            // req remote api service
            remoteApiResp = await this.http(this.composedApiServiceUrl(apiUrl, zipEle.value, apiK));
    
            if (!remoteApiResp) return;
            
            // destructure needed data
            let { dt, main: { temp }, weather: [{ icon }] } = remoteApiResp;
    
            // try posting to the local server
            let localPostApiResp = await this.http(weather, 'POST', { date: dt, temp, zip: zipEle.value, feeling: feelingsEle.value, icon });
    
            if (!localPostApiResp.done) return;
    
            // get the latest req posted
            localApiResp = await this.http(weather + '/last');
    
            if (!localApiResp.data) return;
    
            // update ui
            this.updateUi(localApiResp.data);
    
        } catch (error) {
            console.log(error);
        }
    
        // hide loading btn
        this.handleLoadingBtn(false);
    
    };
};

// module init
WeatherJ.prototype.init = function () {
    const weatherj = new WeatherJ(); // instance

    const { generateBtn, form } = weatherj.cachedVars(); // use it

    // start on the clicked form btn
    generateBtn?.addEventListener('click', (e) => weatherj.handleBtnClick(e));
    form?.addEventListener('submit', (e) => e.preventDefault);
};

// init
WeatherJ.prototype.init();