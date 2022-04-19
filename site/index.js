const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");

function getRandomElement(array){
    return array[(Math.random() * array.length) | 0]
}

function getRandomImage(array){
    const header = document.querySelector("header");
    let randomBreed = getRandomElement(array);
    let breedImage = document.createElement("figure");
    breedImage.innerHTML = `
        <img src="${randomBreed.image.url}" alt="${randomBreed.name}"/>
    `
    header.append(breedImage)
}

/*const testArray = ["Poodle", "Golden Doodle", "Pitbull", "Golden Retriever", "Dalmatian", "Beagle", "Yorkee"]
console.log(getRandomElement(testArray));*/

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse);
        getRandomImage(parsedResponse);
        spinner.classList.add("hidden");
    });