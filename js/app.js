const loadAllCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllCategory(data.data.news_category);
}

const displayAllCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('px-4');
        categoryDiv.innerHTML = `
        <a href="">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    }
}



loadAllCategory();