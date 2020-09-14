const CITY = document.querySelector("#city");
const TOKEN_WEATHER = '0c52f79e0829737b6175b01d7ba03637';
const TOKEN_CITY = 'ddc1549dd30249';

CITY.addEventListener("keyup", (e) => {
    e.preventDefault();

    const CITY_SEARCH = CITY.value;

    if(e.key === "Enter") 
        locationCity(CITY_SEARCH);
});

"pensar se é viável inserir a localização pelo geolocation para usar na primeira chamada"

function locationCity(city){
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${TOKEN_CITY}&q=${city}&format=json`;
    const REQUEST = fetch(URL);

    REQUEST
        .then(data => data.json())
        .then(data => {
            const { lat, lon, display_name } = data[0];
            const LOCAL = display_name.split(",")[0];

            weatherCity(lat, lon, LOCAL);
        })
        .catch(err => {
            console.log("não foi possível recuperar os dados");
        });

}

function weatherCity(lat, lon, local){
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${TOKEN_WEATHER}`;
    const REQUEST = fetch(URL);
    
    REQUEST
        .then(data => data.json())
        .then(data => {
            const { 
                current: { temp, feels_like, wind_speed, pressure, humidity, 
                weather:[{ description }] },
                daily,
            } = data;

            const FORECAST = {
                temp,
                feels_like,
                wind_speed,
                pressure,
                humidity,
                description,
                daily
            }

            weatherFront(FORECAST, local);

            /*daily.forEach(e => {
                console.log(e.humidity);
            });
            
            console.log(`${temp}, ${feels_like}, ${wind_speed}, ${pressure}, ${humidity}, ${description}`);*/
        })
        .catch(err => {
            console.log("Não foi possível recuperar os dados!");
        });
}


function weatherFront(forecast,local){
    const TODAY = document.querySelector("#today");
    const TODAY_INFO = document.querySelector("#today-info");
    const WEEK = document.querySelector("#week");

    TODAY.innerHTML = "";
    TODAY_INFO.innerHTML = "";

    //como adicionar os textos e tags html
    const P = document.createElement("p");
    const UL = document.createElement("ul");
    const LI_ST = document.createElement("li");
    const LI_WIND = document.createElement("li");
    const LI_PA = document.createElement("li");
    const LI_UR = document.createElement("li");
    const I = document.createElement("i");

    const TEXT_TEMP = document.createTextNode(`${local}, ${Math.round(forecast.temp)}º`);
    const TEXT_ST = document.createTextNode(`${Math.round(forecast.feels_like)}º ST`);
    const TEXT_WIND = document.createTextNode(`${forecast.wind_speed} Km/H`);
    const TEXT_PA = document.createTextNode(`${forecast.pressure} hPa`);
    const TEXT_UR = document.createTextNode(`${forecast.humidity} UR`);

    P.appendChild(TEXT_TEMP);
    TODAY.append(P);

    LI_ST.appendChild(TEXT_ST);
    LI_WIND.appendChild(TEXT_WIND);
    LI_PA.appendChild(TEXT_PA);
    LI_UR.appendChild(TEXT_UR);

    UL.append(LI_ST);
    UL.append(LI_WIND);
    UL.append(LI_PA);
    UL.append(LI_UR);
    TODAY_INFO.append(UL);
}
