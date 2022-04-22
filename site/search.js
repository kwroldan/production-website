const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");
let breedName = "";

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    breedName = formData.get("breed-name");
    console.log(breedName);
    //event.target.reset();

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        const dogObject = parsedResponse.find(element => element.name.includes(breedName));
        console.log(dogObject);
        const searchResultFigure = document.createElement("figure");
        searchResultFigure.innerHTML = `
            <img src="${dogObject.image.url}" alt="${dogObject.name}" />
            <figcaption>${dogObject.name}</figcaption>
        `
        const searchResultSection = document.querySelector("#search-result-section")
        searchResultSection.append(searchResultFigure);
        const breedInformation = document.createElement("ul");
        breedInformation.innerHTML = `
            <li><em>Bred for:</em> ${dogObject.bred_for}</li>
            <li><em>Breed Group:</em> ${dogObject.breed_group}</li>
            <li><em>Life Span:</em> ${dogObject.life_span}</li>
            <li><em>Temperament:</em> ${dogObject.temperament}</li>
            <li><em>Weight:</em> ${dogObject.weight.imperial} lbs.</li>
        `
        searchResultSection.append(breedInformation);
        searchResultSection.classList.remove("hidden");
    })
})