const apiUrl = "https://api.thedogapi.com/v1/breeds";
const dogApiKey = "56ca9d3f-7947-4e93-893b-beea68ab3430";

fetch(apiUrl).then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse);
    });