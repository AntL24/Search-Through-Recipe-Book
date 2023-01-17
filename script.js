//Js
//Filter Array



let galleryArray = [
    {
        id: 1,
        name: "Banana cake",
        src : "img/banana-cake.jpg",
        budget: 100,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 2,
        name: "Chocolate ice cream",
        src : "img/chocolate-ice-cream.jpg",
        budget: 200,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 3,
        name: "Strawberry milk",
        src : "img/strawberry-milk.jpg",
        budget: 50,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 4,
        name: "Strawberry cake",
        src : "img/strawberry-cake.jpg",
        budget: 150,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 5,
        name: "Chocolate cake",
        src : "img/chocolate-cake.jpg",
        budget: 200,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }

];
///////////////////////////
//Call to display gallery//
///////////////////////////
displayGallery(galleryArray);
///////////////////////////////
/**/function displayGallery(defaultArray){
        document.getElementById("card").innerText = "";
        
        for(let i=0; i<defaultArray.length; i++){
            document.getElementById("card").innerHTML += `
                <div class="col-md-4 mt-3">
                    <div class="card" p-3 ps-5 pe-5>
                        <h4 class = "text-capitalize text-center">${defaultArray[i].name}</h4>
                        <img src="${defaultArray[i].src}" width="100%" height="200px" />
                        <p class="mt-2">${defaultArray[i].desc}</p>
                        <button class="btn btn-primary w-100 mx-auto">More Info</button>
                    </div>
                </div>
            `
        }
    }
//////////////////////////////////////
//Filter gallery according to input///
//////////////////////////////////////
document.getElementById("myinput").addEventListener("keyup", filterGallery);

//////////////////////////////////////
//Sort results according to select////
//////////////////////////////////////
document.getElementById("myselect").addEventListener("change", displaySortedRecipes);

/////////////
//Functions//
/////////////

//Sort gallery by budget, from low to high, or from high to low. Also alphabetically, reverse alphabetically.
    function displaySortedRecipes(){
        //Empty the input field, to avoid displaying the filtered array.
        document.getElementById("myinput").value = "";
        //Make display none for para and para2.
        document.getElementById("para").style.display = "none";
        document.getElementById("para2").style.display = "none";
        //Sort according to selected option.
        let select = document.getElementById("myselect").value;
        //Use switch statement to sort the array according to the user's choice.
        switch(select){
            case "default":
                displayGallery(galleryArray);
                break;

            case "low":
                //Make a copy of the gallery array, to avoid changing the original array.
                let sortedArrayCheapest = [...galleryArray];
                sortedArrayCheapest.sort((a, b) => a.budget - b.budget);
                displayGallery(sortedArrayCheapest);
                break;
            
            case "high":
                let sortedArrayPriciest = [...galleryArray];
                sortedArrayPriciest.sort((a, b) => b.budget - a.budget);
                displayGallery(sortedArrayPriciest);
                break;
            
            case "a-z":
                let sortedArrayAZ = [...galleryArray];
                sortedArrayAZ.sort((a, b) => a.name.localeCompare(b.name));
                displayGallery(sortedArrayAZ);
                break;

            case "z-a":
                let sortedArrayAZReverse = [...galleryArray];
                sortedArrayAZReverse.sort((a, b) => b.name.localeCompare(a.name));
                displayGallery(sortedArrayAZReverse);
                break;
        }
    }

//Search through gallery array using binary method, with a typo tolerance of 3.
//Function should be able to match partial strings. For example, if the user types "straw", the function should return all items that contain the string "straw", such as "strawberry milk", "strawberry cake", etc.
function search(name, recipes) {
    let results = [];
    let addedRecipes = new Set();
  
    // Binary search for exact match
    let left = 0;
    let right = recipes.length - 1;
    while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      if (recipes[middle].name === name) {
        if (!addedRecipes.has(recipes[middle].id)) {
          results.push(recipes[middle]);
          addedRecipes.add(recipes[middle].id);
        }
        break;
      } else if (recipes[middle].name < name) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  
    //Approximate match using Levenshtein distance with a threshold of 3
    let threshold = 3;
    for (let i = 0; i < recipes.length; i++) {
      let distance = levenshteinDistance(name, recipes[i].name);
      if (distance <= threshold) {
        if (!addedRecipes.has(recipes[i].id)) {
          results.push(recipes[i]);
          addedRecipes.add(recipes[i].id);
        }
      }
    }
  
    // Partial match search
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].name.toLowerCase().includes(name.toLowerCase())) {
          if (!addedRecipes.has(recipes[i].id)) {
              results.push(recipes[i]);
              addedRecipes.add(recipes[i].id);
          }
      }
    }
    return results;
  }
  
  function levenshteinDistance(a, b) {
    //implementation of the Levenshtein Distance algorithm
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    let matrix = [];
  
    // increment along the first column of each row
    let i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    let j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                  Math.min(matrix[i][j - 1] + 1, // insertion
                                           matrix[i - 1][j] + 1)); // deletion
        }
      }
    }
    return matrix[b.length][a.length];
  }


    //Function to display filtered gallery according to input and result of binary search function.
    function filterGallery(){
        let input = document.getElementById("myinput").value;
        //filterByBinarySearch returns an array of objects that match the input.
        let searchResultsArray = search(input, galleryArray);
        if(this.value == ""){//this.value is the value of the input. If the input is empty, we display the gallery.
            displayGallery(galleryArray);
            document.getElementById("para").style.display = "none";
            document.getElementById("para2").style.display = "none";

        }
        else{
            if(searchResultsArray == ""){ //If the filtered array is empty, we display a "not found" message.
                document.getElementById("para").style.display = "block";
                document.getElementById("card").innerHTML = "";//We clear the gallery by setting the innerHTML to an empty string. The array is not empty, but the visual representation is.
            }
            else{ //If the filtered array is not empty, we display the filtered gallery.
                displayGallery(searchResultsArray);
                document.getElementById("para").style.display = "none";
                document.getElementById("para2").style.display = "block";
            }
        }
    }

    