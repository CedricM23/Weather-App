// WeatherApp

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "47cb605aff197d0cf790f57d8bc5721b";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;
    
    if (city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("No city entered")
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok){
        throw new Error("City not found. Please try again.");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data)
    const {name: city, //destructure the data object
        main:{temp, humidity}, //destructure the main object
        weather: [{description, id}], //destructure the first object in the weather array
        wind: {speed}, //destructure the wind object
        sys: {country}} //destructure the sys object

        = data; 

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1")
    const countryDisplay = document.createElement("p")
    const tempDisplay = document.createElement("p")
    const windspeed = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    countryDisplay.textContent = country;
    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
    windspeed.textContent = `Wind Speed: ${speed} mph`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id)


    //add the class atributes from the css file to the proper elements
    cityDisplay.classList.add("cityDisplay")
    countryDisplay.classList.add("countryDisplay")
    tempDisplay.classList.add("tempDisplay")
    windspeed.classList.add("windspeed")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add("weatherEmoji")
    
    card.appendChild(cityDisplay)
    card.appendChild(countryDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(windspeed)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId) {
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "☔️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
        return "❓";
    }
}

function displayError(message) {

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}