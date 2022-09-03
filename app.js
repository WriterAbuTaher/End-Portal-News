const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`

    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data))
        .catch(error => console.log(error))
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
    document.getElementById("spiner").classList.remove("d-none")

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}



const displayNews = (newses) => {

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;

    document.getElementById("items-number").innerText = newses.length;

    newses.sort((a, b) => b.total_view - a.total_view).forEach(news => {
        // console.log(news);

        const div = document.createElement("div");

        div.innerHTML = `
        <div class="card mb-3 w-75 mx-auto">
            <div class="row g-0">
                <div class="col-12 border col-md-3">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="mt-0">${news.title}</h5>
                        <p>${news.details.slice(1, 500)}...</p>
                    </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex">
                                    <img class="rounded-5" width="30" height="25" src="${news.author.img}" alt="">
                                    <p class="fw-bold mx-2">${news.author.name === null || news.author.name === "system" ? news.author.name = "Not Found" : news.author.name}</p>
                                </div>
                            <p>${news.total_view === null ? news.total_view = "Not Found" : news.total_view}👁‍🗨</p>
                            <button onclick="loadModal('${news._id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#detailModal">Read details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(div)
    })
    document.getElementById("spiner").classList.add("d-none")
}

loadNews("02")

const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => modalDetail(data.data))
}

const modalDetail = (news) => {
    document.getElementById("modal-label").innerText = news[0].title;
    document.getElementById("news-text").innerText = news[0].details;
    document.getElementById("expire").innerText = news[0].author.published_date;
}

loadCategories()