const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";
const spinner = document.querySelector(".spinner");
const header = document.querySelector("header");

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

// Breed Grid Buttons  
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
    gridFigures.forEach(figure => figure.remove());
    fetch(apiUrl).then(response => response.json())
        .then(parsedResponse => createRandomGridImage(parsedResponse));
        spinner.classList.add("hidden");
})

// Breeding Purpose Minigame
function getRandomElement(array){
    return array[(Math.random() * array.length) | 0]
}

let selectedBreed = "";

function generateQuestion(array){
    const questionForm = document.querySelector("#quiz-form");
    const bredForArray = array.filter(element => element.bred_for);
    const answerPoolArray = _.sampleSize(bredForArray, 4);
    selectedBreed = getRandomElement(answerPoolArray);
    questionForm.innerHTML = `
    <label for="${answerPoolArray[0].bred_for}">
        <input type="radio" name="choice" value="${answerPoolArray[0].bred_for}">
        ${answerPoolArray[0].bred_for}
    </label>
    <label for="${answerPoolArray[1].bred_for}">
        <input type="radio" name="choice" value="${answerPoolArray[1].bred_for}">
        ${answerPoolArray[1].bred_for}
    </label>
    <label for="${answerPoolArray[2].bred_for}">
        <input type="radio" name="choice" value="${answerPoolArray[2].bred_for}">
        ${answerPoolArray[2].bred_for}
    </label>
    <label for="${answerPoolArray[3].bred_for}">
        <input type="radio" name="choice" value="${answerPoolArray[3].bred_for}">
        ${answerPoolArray[3].bred_for}
    </label>
    <input type="submit" id="submit" value="Submit" />
    `
    const purposeImage = document.querySelector(".purpose-image");
    const selectedBreedImage = document.querySelector("#selected-breed");
    selectedBreedImage.innerHTML = `
        <img src="${selectedBreed.image.url}" alt="${selectedBreed.name}" />
        <figcaption id="quizImage">${selectedBreed.name}</figcaption>
    `
    purposeImage.append(selectedBreedImage);
}

const quizForm = document.querySelector("form");
quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkAnswer(selectedBreed);
})

function checkAnswer(selectedBreed){
    const radioOptions = document.querySelectorAll("input");
    let answerValue = "";
    radioOptions.forEach(radio => {
        if (radio.checked) {
            answerValue = radio.value
        }
    })
    if (answerValue == "") {
        alert("Please select an answer");
    } else if (answerValue == `${selectedBreed.bred_for}`) {
        alert("Correct!")
    } else {
        alert("Please try again.")
    }
}

const newQuizQuestionButton = document.querySelector("#quiz-button");
newQuizQuestionButton.addEventListener("click", event => {
    const quizImage = document.querySelector(".purpose-image > figure > img");
    const quizFigcaption = document.querySelector(".purpose-image > figure > figcaption");
    quizImage.remove();
    quizFigcaption.remove();
    fetch(apiUrl).then(response => response.json())
        .then(parsedResponse => generateQuestion(parsedResponse));
})


fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        createRandomGridImage(parsedResponse);
        generateQuestion(parsedResponse);
        spinner.classList.add("hidden");
    })