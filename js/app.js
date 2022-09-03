const loadAllCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data.news_category);
}

const displayAllCategory = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div class="px-2">
         <Button onclick = "loadSpecificNews('${category.category_id}')" class =" btn btn-light ">${category.category_name}</button>
        </div>
        `;

        categoryContainer.appendChild(categoryDiv);
        // console.log(category.category_id);
    }
}

const loadSpecificNews = async (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displaySpecificNews(data.data);

}

const displaySpecificNews = news => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerText = '';
    for (const info of news) {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('py-8');
        newsDiv.innerHTML = `
        <div  class="card mb-3" style="max-width: 1200px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${info.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${info.title}</h5>
                    <p class="card-text">${info.details.slice(0, 400)}...</p>
                   
                  <div class= "d-flex mt-5">
                  <img src="${info.author.img}" class="img-fluid rounded-circle" alt="..." style="height: 5% ;width: 5% ;">
                  <div>
                  <p class="card-text mx-3">${info.author.name}</p>
                  </div>
                  <div class= "d-flex mx-5">
                  <i style="height: 5% ;width: 2% ;" class="fa-regular fa-eye mt-1"></i>
                  <p class="card-text mx-4">${info.total_view}</p>
                  </div>
                 
                  </div>
                  <Button id="btn-seeMore" style="margin-left: 600px;" onclick="loadSpecificNews()" class=" btn btn-primary  "><i
                 class="fa-solid fa-arrow-right text-end"></i></button>
                </div>
            </div>
        </div>
    </div>

`;
        newsContainer.appendChild(newsDiv);

    }



}



loadSpecificNews();




loadAllCategory();

// document.getElementById('category.category_id');