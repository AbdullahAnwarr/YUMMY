$(document).ready(() => {
getMainMeals().then(()=>{
    $('.loading').fadeOut(500)
    $('body').css("overflow", "visible")
})
})

let myMeals=[];
let myCates=[];
let mainBox = ``;
let descBox = ``;
let ingredientBox = ``;
let searchBox = ``;
let cateBox = ``;
let areaBox = ``;
let ingBox = ``;
let areaMeal = ``;
let cateMeal = ``;
let ingMeal = ``;
let outerWidth = $('nav ul').outerWidth()

//get data from api
async function getData(type) {
    let api = `https://www.themealdb.com/api/json/v1/1/${type}`
    let data = await fetch(api)
    let response = await data.json()
    myMeals = await response.meals
    myCates = await response.categories
}
//get description for selected meal
function descSection(id) {

    for (let i = 1; i < 21; i++) {
        let ind = `strIngredient${i}`;
        'strIngredient1'
        'strIngredient2'
        'strIngredient3'
        let ingredients = myMeals[id][ind]
        if (ingredients!="") {
            
            ingredientBox += `
            <span class="text-bg-light p-1 rounded-1 mb-2 d-inline-block">${ingredients}</span>
            `
        }
        
        
    }

    descBox = `
    <div class="col-md-5">
    <div>
      <img src="${myMeals[id].strMealThumb}" class="w-100 rounded-top-2" alt="${myMeals[id].strMeal}">
      <h2 class="bg-eee text-dark rounded-bottom-2 text-center">${myMeals[id].strMeal}</h2>
    </div>
  </div>
  <div class="col-md-7">
    <h3>Instructions</h3>
    <p>${myMeals[id].strInstructions}</p>
    <h3>Area : <span>${myMeals[id].strArea}</span></h3>
    <h3>Category : <span>${myMeals[id].strCategory}</span></h3>
    <h3>Recipes :</h3>
    <div class="recipes-items">
     ${ingredientBox}
    </div>
    <div class="btns-source mt-4">
    <a class="text-decoration-none" target='_blank' href="${myMeals[id].strSource}">
      <div class="btn btn-success me-2">Source</div>
      </a>
      <a class="text-decoration-none" target='_blank' href="${myMeals[id].strYoutube}">
      <div class="btn btn-danger">Youtube</div>
      </a>
    </div>
  </div>
    `
    $('section').addClass('d-none')
    $('#description').removeClass('d-none')
    displayMeals('description .row', descBox)
    descBox = ``;
    $('html,body').animate({ scrollTop:0})
    
}
function displayMeals(id,temp) {
    $(`#${id}`).html(temp)
}
//main page 
async function getMainMeals() {
    
    await getData('search.php?s=')
    mainSection()
    displayMeals('main .row', mainBox)
    mainBox = ``;
}

async function mainSection() {
    for (let i = 0; i < myMeals.length; i++) {
        mainBox += `
        <div class="col-md-3">
          <div class="item rounded-1">
            <img src="${myMeals[i].strMealThumb}" class="w-100" alt="${myMeals[i].strMeal}">
            <div onclick="descMain(${i})" class=" item-title justify-content-center d-flex align-items-center trans text-dark m-1 bg-white bg-opacity-50 rounded-1">
                <h2 >${myMeals[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
        //
    }
    

}

async function descMain(id) {
    await getData(`search.php?s=`)
    descSection(id)

}

//end of main page 

// categories page
function cateSection() {
    for (let i = 0; i < myCates.length; i++) {
        cateBox += `
        <div class="col-md-3">
         <div onclick="displayCateMeals(${i})" class="item rounded-1">
           <img  src="${myCates[i].strCategoryThumb}" class="w-100" alt="${myCates[i].strCategory}">
           <div class=" item-title  d-flex flex-column align-items-center trans m-1 text-dark bg-white bg-opacity-50 rounded-1">
             <h2>${myCates[i].strCategory}</h2>
             <p class="text-center">${myCates[i].strCategoryDescription}</p>
           </div>
         </div>
       </div>
        `
    }
}
async function displayCateList() {
    await getData('categories.php')
    cateSection()
    displayMeals('categories .row', cateBox)
    cateBox = ``;
}
function cateMeals() {
    for (let i = 0; i < myMeals.length; i++) {
        cateMeal += `
        <div class="col-md-3">
          <div onclick="descCate(${i})" class="item rounded-1">
            <img src="${myMeals[i].strMealThumb}" class="w-100" alt="${myMeals[i].strMeal}">
            <div  class=" item-title justify-content-center d-flex align-items-center trans text-dark m-1 bg-white bg-opacity-50 rounded-1">
              <h2 >${myMeals[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
    }
}
async function displayCateMeals(id) {
    await getData('categories.php')
    await getData(`filter.php?c=${myCates[id]['strCategory']}`)
    cateMeals()
    displayMeals('categories .row', cateMeal)
    cateMeal = ``;
}
async function descCate(id) {
    await getData(`search.php?s=${myMeals[id]['strMeal']}`)
    descSection(0)
}
//end of categories page

//area page
function areaSection() {
    for (let i = 0; i < myMeals.length; i++) {
        areaBox += `
    <div class="col-md-3">
        <div onclick="displayAreaMeals(${i})" class="d-flex flex-column align-items-center">
        <i class="fa-solid fa-city  fa-7x"></i>
          <h3>${myMeals[i].strArea}</h3>
        </div>
      </div>
        `
        
    }

}
async function displayAreaList() {
    await getData('list.php?a=list')
    areaSection()
    displayMeals('area .row',areaBox)
    areaBox = ``;
}

function areaMeals() {
    
    for (let i = 0; i < myMeals.length; i++) {
        areaMeal += `
        <div class="col-md-3">
          <div onclick="descArea(${i})" class="item rounded-1">
            <img src="${myMeals[i].strMealThumb}" class="w-100" alt="${myMeals[i].strMeal}">
            <div  class=" item-title justify-content-center d-flex align-items-center trans text-dark m-1 bg-white bg-opacity-50 rounded-1">
              <h2 >${myMeals[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
        
    }

}
async function descArea(id) {
    await getData(`search.php?s=${myMeals[id]['strMeal']}`)
    descSection(0)

}
async function displayAreaMeals(id) {
    await getData('list.php?a=list')
    
    await getData(`filter.php?a=${myMeals[id]['strArea']}`)
    areaMeals()
    displayMeals('area .row',areaMeal)
    areaMeal = ``;
    
}
//end of area page

//search page
function searchSection() {
    
    for (let i = 0; i < myMeals.length; i++) {
        searchBox += `
        <div class="col-md-3">
          <div class="item rounded-1">
            <img src="${myMeals[i].strMealThumb}" class="w-100" alt="${myMeals[i].strMeal}">
            <div onclick="descSearch(${i})" class=" item-title justify-content-center d-flex align-items-center trans text-dark m-1 bg-white bg-opacity-50 rounded-1">
              <h2 >${myMeals[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
        
    }

}
async function descSearch(id) {
    await getData(`search.php?s=${myMeals[id]['strMeal']}`)
    descSection(0)

}
async function searchByName(type) {
    if (type != undefined) {
        await getData(`search.php?s=${type}`)
        searchSection()
    } else {
        await getData(`search.php?s=`)
        searchSection()
    }

}
async function searchByLetter(type) {
    if(type != undefined){
    await getData(`search.php?f=${type}`)
        searchSection()
    } else {
        await getData(`search.php?s=`)
        searchSection()
        
    }
}

$('#searchByName').on('input', async function (e) {
    let type = $(e.target).val()
    if (type != undefined) {
        await getData(`search.php?s=${type}`)
        searchSection()
    } else {
        await getData(`search.php?s=`)
        searchSection()
    }
    displayMeals('displaySearch', searchBox)
    searchBox = ``;
})
$('#searchByLetter').on('input', async (e) => {
    let type = $(e.target).val()
    if(type != undefined){
        await getData(`search.php?f=${type}`)
            searchSection()
        } else {
            await getData(`search.php?s=`)
            searchSection()
            
        }
    displayMeals('displaySearch',searchBox)
    searchBox = ``;
    
})
//end of search page

//ingredient page
function ingSection() {
    for (let i = 0; i < myMeals.length; i++) {
        ingBox += `
    <div class="col-md-3">
        <div onclick="displayIngMeals(${i})" class="d-flex flex-column align-items-center">
          <i class="fa-solid fa-drumstick-bite fa-6x"></i>
          <h3 class="h4">${myMeals[i].strIngredient}</h3>
        </div>
      </div>
        `
        
    }

}
async function displayIngList() {
    await getData('list.php?i=list')
    ingSection()
    displayMeals('ingredients .row',ingBox)
    ingBox = ``;
}

function ingMeals() {
    
    for (let i = 0; i < myMeals.length; i++) {
        ingMeal += `
        <div class="col-md-3">
          <div onclick="descIng(${i})" class="item rounded-1">
            <img src="${myMeals[i].strMealThumb}" class="w-100" alt="${myMeals[i].strMeal}">
            <div  class=" item-title justify-content-center d-flex align-items-center trans text-dark m-1 bg-white bg-opacity-50 rounded-1">
              <h2 >${myMeals[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
        
    }

}
async function descIng(id) {
    await getData(`search.php?s=${myMeals[id]['strMeal']}`)
    descSection(0)

}
async function displayIngMeals(id) {
    await getData('list.php?i=list')
    
    await getData(`filter.php?i=${myMeals[id]['strIngredient']}`)
    ingMeals()
    displayMeals('ingredients .row',ingMeal)
    ingMeal = ``;
    
}

$('ul li:not(:first-child)').click(function (e) { 
    $('#home,.scroll').css({'display':'none'});
});
$('ul li').eq(0).click(async function (e) { 
    $('#home').css({'display':'block'});
    location.reload()
});
$('ul li').eq(5).click(async function (e) { 
    location.href='login/index.html'
})
