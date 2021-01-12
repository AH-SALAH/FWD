// ==================================
// import all files from a dir that match regex
let cache = {};
export const importAll = (r) => {
    r.keys().forEach((key) => {
        cache[key] = r(key);

        // get img which need to be converted to base64 by url-loader
        let getimgstr = key.split('/')[1].split('.')[0],
            img = document.querySelector('[alt="' + getimgstr + '"]'),
            imgsArray = []; // list of imgs name
        // console.log("getimgstr: ",getimgstr);
        if (img && /*$.inArray(getimgstr,imgsArray)*/imgsArray.indexOf(getimgstr) > -1) {
            img.src = cache[key];
            // console.log("ifistrue: ",img);
        }
    });
};