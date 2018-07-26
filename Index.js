//javascript

let i=0;
let rangeLeft,rangeRight;
//Menu Array
let menu =[
    {
        pictureUrl: 'images/chicken soup.jpg',
        category: 'Entrees',
        name: 'Chicken Soup',
        price: 22.5,
        vegetarian: false
    },
    
    {
        pictureUrl: 'images/carbonara.png',
        category: 'Second Courses',
        name : 'Pasta Carbonara',
        price : 20,
        vegetarian: false
    },
    
    { 
        pictureUrl: 'images/pasta_walnuts.png',
        category : 'Second Courses',
        name : 'Pasta with walnut',
        price : 15,
        vegetarian: true
        
    },
    
    
    {
        pictureUrl: 'images/pizza.jpg',
        category : 'Pizza',
        name : 'Pizza',
        price : 17,
        vegetarian: false
        
    },
    
    {
        pictureUrl: 'images/pancakes.jpg',
        category : 'Dessert',
        name : 'Pancakes',
        price : 5,
        vegetarian: false
    },
    
    {
        pictureUrl: 'images/vitamin_salad.jpeg',
        category : 'Salads',
        name : 'Vitamin Salad',
        price : 15,
        vegetarian: true
    }
]

//show menu
function showMenu() {
    renderMenuItems(menu);
}

function renderMenuItems(menuItems) {
    menuItems.forEach(function(menuItem) {
        renderMenuItem(menuItem);
    });
}

//show element from the array
function renderMenuItem(menuItem) {
    let x;
    let link = menuItem.pictureUrl;
    let cat = menuItem.category;
    let name = menuItem.name;
    let price = menuItem.price;
    x = "<div class='col-3' >" + 
    "<p class='menu-image-wrapper'> <img src= ' " + link + "'> </p>" + 
    "<div class='item-details text-center'>" +
    "<h5><strong>" +name +"</strong></h5>" +
    "<h6 class = 'type'>" +cat + "</h6>"+
    " <h6 class ='price'> $"+price+"</h6>"+        
    " </div>"+ "</div>";
    
    parentNode = document.getElementById('first')
    content = parentNode.innerHTML + x   
    parentNode.innerHTML = content;
}

//show elements from category
function showCategory(categoryType) {
    parentNode.innerHTML ='';

    let menuItems = [];

    menu.forEach(function(menuItem) {
        if (menuItem.category === categoryType) {
            menuItems.push(menuItem);
        }
    });

    renderMenuItems(menuItems);
}

function showMenuAfter() {
    parentNode.innerHTML= '';
    showMenu();
}

//sort function
function sort(order) {
    let j,aux=[];
    if(order ==='asc')
    {
        for (i = 0; i < menu.length -1; i++){       
            for (j = 0; j < menu.length -i-1; j++) 
            {
                if (menu[j].price > menu[j+1].price){
                    aux=menu[j];
                    menu[j]=menu[j+1];
                    menu[j+1]=aux;
                }
            }
        }
    }
    else if(order === 'desc')
    {   
        for (i = 0; i < menu.length -1; i++){       
            for (j = 0; j < menu.length -i-1; j++) 
            {
                if (menu[j].price < menu[j+1].price){
                    aux=menu[j];
                    menu[j]=menu[j+1];
                    menu[j+1]=aux;
                }
            }
        }
        
    }
    
    showMenuAfter();      
}

//show Vegetarian food
function veg(){
    parentNode.innerHTML= '';
    let menuItems = [];

    menu.forEach(function(menuItem) {
        if (menuItem.vegetarian) {
            menuItems.push(menuItem);
        }
    });
    
    renderMenuItems(menuItems);  
}

function sortSlider(a,b) {
    parentNode.innerHTML ='';

    let menuItems = [];

    menu.forEach(function(menuItem) {
        if (menuItem.price >a && menuItem.price<b) {
            menuItems.push(menuItem);
        }
    });

    renderMenuItems(menuItems);
    
}

document.addEventListener("DOMContentLoaded",function(event) {
    showMenu();
});

function getVals() {
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat(slides[0].value);
    var slide2 = parseFloat(slides[1].value);
    
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        var tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }
    
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = "$ " + slide1 + " - $" + slide2 ;
    sortSlider(slide1,slide2);
}

window.onload = function() {
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
    for (var x = 0; x < sliderSections.length; x++) {
        var sliders = sliderSections[x].getElementsByTagName("input");
        for (var y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
};