const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");
let breedName = "";
const searchResultSection = document.querySelector("#search-result-section")
const searchContainer = document.querySelector(".search-result-container");
searchContainer.classList.add("hidden");
searchContainer.classList.remove("search-result-container");

function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function checkDogObject(object){
    if(object === undefined) {
        alert("The breed you entered was not found. Please try again.")
    }
}

function checkProperties(objectProperty) {
    if (objectProperty === undefined) {
        return "N/A"
    } else {
        return objectProperty
    }
}

const newSearchButton = document.querySelector("#search-button-container");
newSearchButton.addEventListener("click", event => {
    const searchResultFigure = document.querySelector("#search-result-section > figure");
    searchResultFigure.remove();
    const breedInformation = document.querySelector("#search-result-section > ul");
    breedInformation.remove();
    searchResultSection.classList.add("hidden");
    newSearchButton.classList.add("hidden");
    searchContainer.classList.add("hidden");
searchContainer.classList.remove("search-result-container");
})

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    breedNameInput = formData.get("breed-name");
    breedName = capitalizeFirstLetter(breedNameInput);
    console.log(breedName);

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        const dogObject = parsedResponse.find(element => element.name.includes(breedName));
        console.log(dogObject);
        checkDogObject(dogObject);
        const searchResultFigure = document.createElement("figure");
        searchResultFigure.innerHTML = `
            <img src="${dogObject.image.url}" alt="${dogObject.name}" />
            <figcaption><em>${dogObject.name}</em></figcaption>
        `
        searchResultSection.append(searchResultFigure);
        const breedInformation = document.createElement("ul");
        breedInformation.innerHTML = `
            <li><em>Bred for:</em> ${checkProperties(dogObject.bred_for)}</li>
            <li><em>Breed Group:</em> ${checkProperties(dogObject.breed_group)}</li>
            <li><em>Life Span:</em> ${checkProperties(dogObject.life_span)}</li>
            <li><em>Temperament:</em> ${checkProperties(dogObject.temperament)}</li>
            <li><em>Weight:</em> ${checkProperties(dogObject.weight.imperial)} lbs.</li>
        `
        searchResultSection.append(breedInformation);
        searchContainer.classList.remove("hidden");
        searchContainer.classList.add("search-result-container");
        searchResultSection.classList.remove("hidden");
        newSearchButton.classList.remove("hidden");
    })
})