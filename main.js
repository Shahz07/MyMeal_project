//index.html

function buttonClicked() {
    var mealName = document.getElementById("searchData").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            var meal = data.meals ? data.meals[0] : null;

            if (meal) {
                var mealName = meal.strMeal;
                var category = meal.strCategory;
                var instructions = meal.strInstructions;
                var mealImage = meal.strMealThumb;
                var relatedSite = meal.strSource || "N/A"; // Use a default value if strSource is missing or null
                var preparationLink = meal.strYoutube; // Assuming the API includes a link on how to prepare the food

                // Extracting ingredients and measurements
                var ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    var ingredient = meal[`strIngredient${i}`];
                    var measurement = meal[`strMeasure${i}`];

                    // Stop when no more ingredients are found
                    if (!ingredient) break;

                    // Displaying ingredient and measurement
                    ingredients.push(`${measurement} ${ingredient}`);
                }

                // Displaying the meal details including the ingredients, related site, and preparation link
                document.getElementById("mealDetails").innerHTML = `
                    <h2>${mealName}</h2>
                    <img src="${mealImage}" alt="${mealName} Image">
                    <p>Category: ${category}</p>
                    <p>Instructions: ${instructions}</p>
                    <h3>Ingredients:</h3>
                    <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                    <p>Related Site: <a href="${relatedSite}" target="_blank">${relatedSite}</a></p>
                    <p>Preparation Link: <a href="${preparationLink}" target="_blank">${preparationLink}</a></p>`;
            } else {
                document.getElementById("mealDetails").innerHTML = "No meal found with that name";
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("mealDetails").innerHTML = "An error occurred while fetching the meal data";
        });
}






//index2.html

const{ app,BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files' )

btnCreate.addEventListener('click',function(){
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){
        if(err){
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + "text file was created")
        console.log("The file was created")
    })

})

btnRead.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)

    fs.readFile(file, function(err, data){
        if(err){
            return console.log(err)
        }
        fileContents.value = data
        console.log("The file was read!")
    })
})


btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value)

    fs.unlink(file, function(err){
        if(err){
            return console.log(err)
        }
        fileName.value = ""
        fileContents.value= ""
        console.log("The file was deleted!")
})
})

btnUpdate.addEventListener('click' ,function(){
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value

    fs.writeFile(file, contents, function(err){
        if(err){
            return console.log(err)
        }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + "text file was updated")
    console.log("The file was created")
    fileName.value = ""
    fileContents.value = ""
    })
})
