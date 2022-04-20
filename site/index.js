const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");
const header = document.querySelector("header");

function getRandomElement(array){
    return array[(Math.random() * array.length) | 0]
}

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
    const randomBreedArray = _.sampleSize(array, 6);
    randomBreedArray.forEach(element => {    
        let singleGridImage = document.createElement("figure");
        singleGridImage.innerHTML = `
            <img src="${element.image.url}" alt="${element.name}"/>
            <figcaption>${element.name}</figcaption>
        `
        breedGrid.append(singleGridImage)
    })
}

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse);
        getRandomHeaderImage(parsedResponse);
        createRandomGridImage(parsedResponse);
        spinner.classList.add("hidden");
    });
