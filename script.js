
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



//Search function using regex.
function search(input, array){
    let regex = new RegExp(input, "i");//i for case insensitive.
    let filteredArray = array.filter((item) => {
        return item.name.match(regex);
    });
    return filteredArray;
}

//Function to display filtered gallery according to input and result of binary search function.
    function filterGallery(){
        let input = document.getElementById("myinput").value;
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