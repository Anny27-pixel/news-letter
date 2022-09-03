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
    console.log(data);
}

const displaySpecificNews = news = {



}



loadSpecificNews();




loadAllCategory();

// document.getElementById('category.category_id');