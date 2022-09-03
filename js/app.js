const loadAllCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        displayAllCategory(data.data.news_category);
    }
    catch (error) {
        return 'error';
    }
}

const displayAllCategory = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div class=" px-2">
         <Button onclick = "loadSpecificNews('${category.category_id}')" class =" btn btn-light ">${category.category_name}</button>
        </div>
        `;

        categoryContainer.appendChild(categoryDiv);
        // console.log(category.category_id);
    }
}


const loadSpecificNews = async (category_id) => {
    // start load
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    // console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySpecificNews(data.data);
    }
    catch (error) {
        return 'error';
    }
}



const displaySpecificNews = (news) => {
    const newsContainer = document.getElementById('news-container');

    // No news availabe 
    const availableNews = document.getElementById('availabe-news');
    availableNews.innerHTML = news.length;
    newsContainer.innerText = '';

    news.sort((a, b) => b.total_view - a.total_view);


    for (const info of news) {
        // console.log(info);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('py-8');
        newsDiv.innerHTML = `
        <div  class="  card mb-3 shadow " style="max-width: 1200px;">
        <div class="row g-0 small-container">
            <div class="col-md-4">
                <img src="${info.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8 mb-5">
                <div class="card-body">
                    <h5 class="card-title">${info.title}</h5>
                    <p class="card-text">${info.details.slice(0, 400)}...</p>
                   
                  <div class= "d-flex mt-5">
                  <img src="${info.author.img}" class="img-fluid rounded-circle" alt="..." style="height: 5% ;width: 5% ;">
                  <div>
                  <p class="card-text mx-3">${info.author.name ? info.author.name : 'No availabe data'}</p>
                  </div>
                  <div class= "d-flex mx-5">
                  <i style="height: 5% ;width: 2% ;" class="fa-regular fa-eye mt-1"></i>
                  <p class="card-text mx-4">${info.total_view ? info.total_view : 'No availabe data'}</p>
                  </div>
                 
                  </div>
               
                </div>
                <Button id="icon-btn" onclick = "loadSeeMore('${info._id}')" style="margin-left: 400px;"  class=" btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#newsDetail"><i
                class="fa-solid fa-arrow-right text-end"></i></button>
            </div>
        </div>
    </div>

`;
        newsContainer.appendChild(newsDiv);

    }

    // start stop
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


const loadSeeMore = async _id => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySeeMore(data.data);
    }
    catch (error) {
        const res = await fetch(url);
        const data = await res.json();
        displaySeeMore(data.data);
    }
}

const displaySeeMore = detailInfo => {
    console.log(detailInfo);
    const modalTitle = document.getElementById('newsDetailLabel');
    modalTitle.innerText = detailInfo[0].title;
    const infoDetails = document.getElementById('info-detail');
    infoDetails.innerHTML = `
    <p>Author: ${detailInfo[0].author.name ? detailInfo[0].author.name : 'No data availabe'}    </p>

    <p>View : ${detailInfo[0].total_view ? detailInfo[0].total_view : 'No data availabe'}    </p>


    <p> Rating ( Number :${detailInfo[0].rating.number ? detailInfo[0].rating.number : 'No data availabe'}, badge :${detailInfo[0].rating.badge ? detailInfo[0].rating.badge : 'No data availabe'})</p>

    <p>others Information ( iTtodays pick: ${detailInfo[0].others_info.is_todays_pick ? detailInfo[0].others_info.is_todays_pick : 'No data availabe'} , isTrending : ${detailInfo[0].others_info.is_trending ? detailInfo[0].others_info.is_trending : 'No data availabe'} )    </p>
    
    `;

}


loadSpecificNews();



loadAllCategory();

// document.getElementById('category.category_id');