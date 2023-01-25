
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
        name: "Chocolate cake",
        src : "img/chocolate-cake.jpg",
        budget: 300,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 4,
        name: "Chocolate chip cookies",
        src : "img/chocolate-chip-cookies.jpg",
        budget: 400,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 5,
        name: "Chocolate pudding",
        src : "img/chocolate-pudding.jpg",
        budget: 500,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 6,
        name: "Coconut cake",
        src : "img/coconut-cake.jpg",
        budget: 600,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
    ,
    {
        id: 7,
        name: "Cupcake",
        src : "img/cupcake.jpg",
        budget: 700,
        category: "Deserts",
        desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam tincidunt, nunc nisl aliquam tortor, eget aliquam nisl nisl sit amet lorem.",
    }
];

displayGallery(galleryArray);

//Displaying the gallery
function displayGallery(defaultArray){
    //We display the gallery.
    document.getElementById("card").innerText = "";
    for(let i=0; i<defaultArray.length; i++){
        document.getElementById("card").innerHTML += `
            <div class="col-md-4 mt-3">
                <div class="card" p-3 ps-5 pe-5>
                    <h4 class = "text-capitalize text-center">${defaultArray[i].name}</h4>
                    <img src="${defaultArray[i].src}" width="100%" height="200px">
                    <div class="card-body">
                        <p>Budget : $${defaultArray[i].budget}</p>
                        <p>Category : ${defaultArray[i].category}</p>
                        <p>Description : ${defaultArray[i].desc}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
//Filtering the gallery according to the value of the input.
document.getElementById("myinput").addEventListener("input", filterGallery);
document.getElementById("myselect").addEventListener("change", sortGallery);

//Sorting the gallery according to the value of the select option.
function sortGallery(){
    let selectValue = document.getElementById("myselect").value;
    let array = galleryArray;
    //switch case to sort the gallery according to the value of the select option.
    //default, a-z, z-a, high, low.
    //Improving idea : instead of sorting the galleryArray, which contains all the elements, we can sort the array that is displayed in the gallery.     
    switch(selectValue){
        case "default":
            array.sort((a, b) => {
                return a.id - b.id;
            });
            displayGallery(array);
            break;
        case "a-z":
            array.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            displayGallery(array);
            break;
        case "z-a":
            array.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
            displayGallery(array);
            break;
        case "high":
            array.sort((a, b) => {
                return b.budget - a.budget;
            });
            displayGallery(array);
            break;
        case "low":
            array.sort((a, b) => {
                return a.budget - b.budget;
            });
            displayGallery(array);
            break;
    }
}



//Search using regex.
function search(input, array, threshold){
    //First attempt to search with a typo tolerance of 0.
    if (threshold == 0){
      return array.filter(item => item.name.toLowerCase() === input.toLowerCase());
    } else {
     //First attempt unsuccesfull, function was called again with a typo tolerance of 3 to search for closest matches.
        return array.filter(item => {
            let itemName = item.name.toLowerCase();
            let index = itemName.indexOf(input.toLowerCase());
            return index !== -1 && levenshtein(input, itemName.substring(index, index + input.length)) <= threshold;
        });
    }
}

function handleArrayResults(array, input){
    //If the array is empty, we search for similar search results.
    console.log("In handleArrayResults")
    if(array == ""){
        let similarSearchResultsArray = search(input, galleryArray, 3);
        //If this is also empty, we display a message saying that no results were found.
        if (similarSearchResultsArray == ""){
            console.log("In handleArrayResults, we have no similar search results")
            //There should be nothing displayed in the gallery except the message.
            document.getElementById("search-suggestion").style.display = "none";
            document.getElementById("para2").style.display = "none";
            document.getElementById("para").style.display = "block";
            displayGallery(similarSearchResultsArray);

        } else {
            console.log("In handleArrayResults, we have similar search results")
            //If we have similar search results, we display them.
            document.getElementById("para").style.display = "block";
            document.getElementById("para2").style.display = "none";
            document.getElementById("search-suggestion").style.display = "block";
            displayGallery(similarSearchResultsArray);
        }
    } else {//If the first search was succesfull, we display the results.
        document.getElementById("para").style.display = "none";
        document.getElementById("para2").style.display = "block";
        document.getElementById("search-suggestion").style.display = "none";
        displayGallery(array);
    }
}


//Display filtered gallery according to input and result of binary search function.
function filterGallery(){
    let input = document.getElementById("myinput").value;
    if(this.value == ""){//If the input is empty, we display the default gallery.
        displayGallery(galleryArray);
        document.getElementById("para").style.display = "none";
        document.getElementById("para2").style.display = "none";
        document.getElementById("search-suggestion").style.display = "none";
    } else {
    let searchResultsArray = search(input, galleryArray, 0);
    handleArrayResults(searchResultsArray, input);
    }
}


           
            
//Calculate the distance between two strings.
function levenshtein(a, b){
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;
    let matrix = [];
    let i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }
    let j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
            }
        }
    }
    console.log("The distance between " + a + " and " + b + " is " + matrix[b.length][a.length] + ".");
    return matrix[b.length][a.length];
}