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
    newses.forEach(news => {
        console.log(news);
    })
}

loadCategories()