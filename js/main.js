let elMovieCardTemplate = document.querySelector("#movie__card").content;
let elCardWrapper = document.querySelector(".card__wrapper");
let elForm = document.querySelector(".form");
let elResult = document.querySelector(".result");
let elRatinginput = document.querySelector(".rating");
let elNameinput = document.querySelector(".name");
let elYearinput = document.querySelector(".year");
let elSelect = document.querySelector(".select");

console.log(elMovieCardTemplate);
let newMovies = movies.slice(0, 10);


function normolize(newMovies){
    
    let normolizedAray = [];
    
    newMovies.forEach(function (item) {
        let newItem = {};
        
        newItem.title = item.Title.toString();
        newItem.movie_year = item.movie_year;
        newItem.imdb_rating = item.imdb_rating;
        newItem.categories = item.Categories.split("|");
        newItem.img = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;
        newItem.video_url = `https://www.youtube.com/watch?v=${item.ytid}`;
        
        normolizedAray.push(newItem);    
    })

    return normolizedAray;
   
}; 

let normolizedAray = normolize(newMovies);

function createCategories(array) {
    let CategoriesArray = []

    for (const item of array) {
        item.categories.forEach(function (item2) {
            if (!(CategoriesArray.includes(item2))) {
                CategoriesArray.push(item2)
            }
           
        })

    }
    return CategoriesArray
     
}

let categoryList = createCategories(normolizedAray);

for (const item of categoryList) {
    
    let newOption = document.createElement("option");

    newOption.textContent = item;

    elSelect.appendChild(newOption)

}


function renderMovies(array) {

    elCardWrapper.innerHTML = null;

    elResult.textContent = array.length;

    let elFragment = document.createDocumentFragment();

    for (let item of array) {

        let movieCard = elMovieCardTemplate.cloneNode(true)

        movieCard.querySelector(".card-img-top").src = item.img;

        movieCard.querySelector(".card-heading").textContent = item.title;

        movieCard.querySelector(".card-year").textContent = item.movie_year;

        movieCard.querySelector(".card-rating").textContent = item.imdb_rating;

        movieCard.querySelector(".categories").textContent = item.categories;

        elFragment.appendChild(movieCard)
        
    }

    elCardWrapper.appendChild(elFragment)

}

renderMovies(normolizedAray);

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let Ratinginputvalue = elRatinginput.value;

    let Yearinputvalue = elYearinput.value;
 

    // let byRating = normolizedAray.filter(item => item.imdb_rating >= Ratinginputvalue);

    let byYearAndbyRating = normolizedAray.filter(function (item)  {

        let yearAndrating = (item.movie_year >= Yearinputvalue) && (item.imdb_rating >= Ratinginputvalue)
       return yearAndrating
    });

    renderMovies(byYearAndbyRating)

    
});








