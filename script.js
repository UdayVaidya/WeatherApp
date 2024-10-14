let result = document.getElementById("result");
let searchButton = document.getElementById("search-btn");
let cityName = document.getElementById("city");

const apiKey = "368e84773ff844eaae0276aaba7b574b";


// Function to fetch weather details from api and display them 
let getWeather = () => {
    let cityValue = cityName.value
    if(cityValue == 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    }else {
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
        
        cityName.value = "";

        fetch(URL)
            .then((resp) => resp.json())
            .then((data) => {

                console.log(data.main.temp_max)
                console.log(data.main.temp_min)
                console.log(data.main.temp)

                result.innerHTML = `
                <h2>${data.name}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />
                <h1>${data.main.temp} &#176;C</h1>
                <div class="temp-container">  
                    <div>
                    <h4 class='title'>Min</h4>
                    <h4 class='temp'>${data.main.temp_min} &#176;C</h4>
                    </div> 
                    <div>
                    <h4 class='title'>Max</h4>
                    <h4 class='temp'>${data.main.temp_max} &#176;C</h4>
                    </div> 
                </div>
                `;
            })
            .catch(() => {
                result.innerHTML = `<h3>City not found</h3>`
            })
    }
};


searchButton.addEventListener("click",getWeather);

cityName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

window.addEventListener("load", getWeather);

