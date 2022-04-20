const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");
const header = document.querySelector("header");

function transformIcon(icon){
    icon.classList.toggle("change");
}

/*function getRandomElement(array){
    return array[(Math.random() * array.length) | 0]
}*/

function getRandomHeaderImage(array){
    let randomBreed = getRandomElement(array);
    let breedImage = document.createElement("figure");
    breedImage.innerHTML = `
        <img src="${randomBreed.image.url}" alt="${randomBreed.name}"/>
    `
    header.append(breedImage)
}

function createRandomGridImage(array){
    const breedGrid = document.querySelector(".grid-images");
    const randomBreedArray = _.sampleSize(array, 8);
    randomBreedArray.forEach(element => {    
        let singleGridImage = document.createElement("figure");
        singleGridImage.innerHTML = `
            <img src="${element.image.url}" alt="${element.name}"/>
            <figcaption class="hidden">${element.name}</figcaption>
        `
        breedGrid.append(singleGridImage)
    })
}

const revealButton = document.querySelector("#reveal");
revealButton.addEventListener("click", event => {
    const allCaptions = document.querySelectorAll("figcaption");
    allCaptions.forEach(figcaption => {
        figcaption.classList.remove("hidden");
    })
})

const rerollButton = document.querySelector("#reroll");
rerollButton.addEventListener("click", event => {
    spinner.classList.remove("hidden");
    const gridFigures = document.querySelectorAll(".grid-images > figure");
    console.log(gridFigures);
    gridFigures.forEach(figure => figure.remove());
    fetch(apiUrl).then(response => response.json())
        .then(parsedResponse => createRandomGridImage(parsedResponse));
        spinner.classList.add("hidden");
})

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        createRandomGridImage(parsedResponse);
        spinner.classList.add("hidden");
    });