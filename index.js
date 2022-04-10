function getF(valNum) {
    let returnVal = (valNum-273.15)*1.8+32; 
    return returnVal;
}
let placeName = ''
let weather = {
    "apiKey": 'ab3568972aeb2a976ce227c16c469c1d',
    fetchWeather: function (zip) {
        fetch(
            'http://api.openweathermap.org/geo/1.0/zip?zip=' 
            + zip + ',US&appid=' 
            + this.apiKey
            )
        .then(response => response.json())
        .then(data => {
            placeName = data.name
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.lat + '&lon=' + data.lon + '&appid=' + this.apiKey)
            .then(response => response.json())
            .then (data =>  this.showWeather(data))
          });
},
// calling the data out of data, data.weather, data.main from openweather
    showWeather: function (data) {
        // const date = data.current.dt; this is what I wanted to use to call the date information from oneweather, but I'm pretty sure their code has some kind of limitation on digits? It's only sending me 10 digits worth of milliseconds, which comes out to a date on Jan 19th 1970. But I need 13 digits worth of milliseconds to have a date in the year 2022.
        const date = new Date();
        const readableDate = new Date(data.current.dt);
        const description = data.current.weather[0].description;
        const  temp = getF(data.current.temp);
        const temp_max = getF(data.daily[0].temp.max);
        const temp_min = getF(data.daily[0].temp.min);
        
        document.querySelector(".city").innerHTML = "Current weather in " + placeName;
        // document.querySelector(".date").innerHTML = "Today's date: " + readableDate.toDateString();
         document.querySelector(".date").innerHTML = "Today's date: " + date.toDateString();
        document.querySelector(".description").innerHTML = 'Current skies: ' + description;
        document.querySelector(".temp").innerHTML = 'Current temperature (daily high/low): ' + temp.toFixed(1) +'&#176 F (' + temp_max.toFixed(1) + '&#176 F/' + temp_min.toFixed(1) + '&#176 F)';
        console.log(data.current.dt);
    }, 
    search: function() {
        this.fetchWeather(document.querySelector('.searchbar').value);
    }
};

document
.querySelector('.search button')
.addEventListener("click", function() {
weather.search();
})