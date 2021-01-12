// Require the polyfill before requiring any other modules.
import "intersection-observer";

/**
 * @description create & expose custom intersectionObserver instance
 * @author AH.SALAH
 * @param {*} { config = {}, target = [], callbackHandler = () => { } }
 * @returns {IntersectionObserver}
 */
export const io = ({ config = {}, target = [], callbackHandler = () => { } }) => {

    let defaultConfig = {
        root: null,
        threshold: Array(10).fill().map((v, i) => i / 10)
    };

    let options = { ...defaultConfig, ...config };

    // callback
    let cb = (entries, self) => {
        callbackHandler(entries, self);
    };

    let createIO = () => {
        let observer = new IntersectionObserver(cb, options);
        // if target is arr then loop, else it's a one element to observe
        if (target.length) target.forEach(t => observer.observe(t));
        else observer.observe(target);

        return observer;
    };

    return createIO();

};