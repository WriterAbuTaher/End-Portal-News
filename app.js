const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data))
}

const displayCategories = (categories) => {

    const newsCategory = (categories.news_category);

    const categoryContainer = document.getElementById("category-container")

    newsCategory.forEach(category => {
        // console.log(category);

        const div = document.createElement("div");

        div.innerHTML = `<button onclick="loadNews('${category.category_id}')" class="btn btn-outline-success mx-2 my-2">${category.category_name}</button>`

        categoryContainer.appendChild(div);
    });
}

const loadNews = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}


const displayNews = (newses) => {

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;

    const newsLength = newses.length;
    const itemsNumber = document.getElementById("items-number");
    itemsNumber.innerText = newsLength;

    newses.forEach(news => {
        console.log(news);

        const cutText = (news.details).slice(1, 300);

        const div = document.createElement("div");

        div.innerHTML = `
        <div class="card mb-3 w-75 mx-auto">
            <div class="row g-0">
                <div class="col-md-4 col-lg-2">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 col-lg-10">
                    <div class="card-body">
                        <h5 class="mt-0">${news.title}</h5>
                        <p>${cutText}...</p>
                    </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                    <img class="rounded-5" width="30" height="25" src="${news.author.img}" alt="">
                                    <p class="fw-bold mx-2">${news.author.name === null || news.author.name === "system" ? news.author.name = "Not Found" : news.author.name}</p>
                                </div>
                            <p>${news.total_view === null ? news.total_view = "Not Found" : news.total_view}👁‍🗨</p>
                            <button href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#detailModal">Read details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(div)

        const modalTitle = document.getElementById("modal-label");
        const modalText = document.getElementById("news-text")
        modalTitle.innerText = news.title;
        modalText.innerText = news.details;
    })
}

loadCategories()