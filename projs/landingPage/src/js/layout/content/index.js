import store from "_/js/store/staticData.json";

const Content = (dataList = store.data || []) => {

    let temp = dataList.map((data, i) => `
        <section id="s__${data.id}" data-nav="${data.ref}" class="p-5 d-flex justify-content-center align-items-center">
            <div class="landing__container container p-5 text-center">
                <div class="row">
                    <div class="col-md-4 clip mb-5">
                        <div class="clip__container">
                            <img src="${data.img}" style="width: 200px;">
                        </div>
                    </div>
                    <div class="col-md-8 details__container mb-5">
                        <h2 class="details__title mb-4">${data.jp}</h2>
                        <h5 class="details__subtitle">${data.romaji}</h5>
                        <q class="details__subtitle">${data.en}</q>
                    </div>
                </div>
            </div>
        </section>
        `
    );

    let sideIndicators = `
        <div class="side__indicators">
            <ul class="side__indicators__ul">
            </ul>
        </div>
    `;

    return (
        `
        <main class="main">
            <header class="main__hero text-center d-flex justify-content-center align-items-center">
                <span class="circle__layer"></span>    
                <div class="container">
                    <h1 class="main__title">kohawayosa</h1>
                </div>
            </header>
          ${temp.join('')}
          ${sideIndicators}
        </main>
        `
    )
};

export default Content;