import store from "_/js/store/staticData.json";

const Header = () => {
    let temp = store.data.map(d => `
        <li class="navbar__list__item nav-item">
            <a class="navbar__list__a nav-link text-capitalize ${d.ref}" data-section="${d.ref}" href="javascript:;">
                ${d.ref}
            </a>
        </li>`);

    return (
        `
        <header class="page__header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light navbar__menu bg-transparent">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="/assets/img/nippon-logo.svg" style="width: 30px;">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <span class="navLink__indicator"></span>
                        <ul class="navbar-nav navbar__list ms-auto my-2 mb-lg-0 text-center">
                            ${temp.join('')}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        `
    )
};

export default Header;