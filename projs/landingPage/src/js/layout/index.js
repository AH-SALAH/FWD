import Header from "./header";
import Content from "./content";
import Footer from "./footer";

const Layout = () => {
    return (`
        ${Header()}
        ${Content()}
        ${Footer()}
    `)
};

export default Layout;