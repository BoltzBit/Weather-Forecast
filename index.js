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
            console.log(data);
        })
        .catch(err => {
            console.log("não foi possível recuperar os dados");
        });

}

function weatherCity(lat, long){
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&units=metric&appid=${TOKEN_WEATHER}`;
    const REQUEST = fetch(URL);
    
    REQUEST
        .then(data => data.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log("Não foi possível recuperar os dados!");
        });
}

"http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}"
