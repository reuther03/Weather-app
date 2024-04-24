const apiKey = "8f16f92ea1dc4a969f0233752242304"
const apiUrl = "https://api.weatherapi.com/v1/current.json?"
const search = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + "key=" + apiKey + "&q=" + city);
    let data = await response.json();

    if (response.status !== 200) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".country").innerHTML = data.location.country;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.gust_kph + "km/h";

        if (data.current.condition.text === "Sunny" || data.current.condition.text === "Clear") {
            icon.src = "images/clear.png";
        } else if (data.current.condition.text === "Partly Cloudy"
            || data.current.condition.text === "Cloudy"
            || data.current.condition.text === "Overcast") {
            icon.src = "images/clouds.png";
        } else if (data.current.condition.text === "Mist" || data.current.condition.text === "Fog") {
            icon.src = "images/fog.png";
        } else if (data.current.condition.text === "Patchy rain nearby"
            || data.current.condition.text === "Patchy light rain"
            || data.current.condition.text === "Patchy sleet nearby") {
            icon.src = "images/rain.png";
        } else if (data.current.condition.text === "Patchy snow nearby"
            || data.current.condition.text === "Patchy light snow" || data.current.condition.text === "Light snow") {
            icon.src = "images/snow.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

btn.addEventListener("click", () => {
    checkWeather(search.value);
});

search.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(search.value);
    }
});