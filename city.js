function unhide(param) {
    document.getElementById(`${param}-head`).style.display = "none";
    document.getElementById(`${param}-info`).style.display = "block";
}
function hide(param) {
    document.getElementById(`${param}-head`).style.display = "block";
    document.getElementById(`${param}-info`).style.display = "none";
}
function cityfunc() {
    let city = document.getElementById("city").value;
    console.log(`The city is ${city}`);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d09cd0e0c359927e26a1df8e5a0de90`
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            let cardholder = document.getElementById("card-holder")
            if (data.cod == 404) {
                cardholder.style.display = "none";
                alert("Nana That city exists only in your imagination");
                document.getElementById("weather-tracker").style['border-radius'] = "20px";
                document.getElementById("city-name").innerHTML = `${city} does not exists`;
                document.getElementById("city-name").style.display = "block";
                document.getElementById("icon").style.display = "none";
                document.getElementById("iconholder").style.display = "none";
            }
            else {
                if (data.cod == 400) {
                    cardholder.style.display = "none";
                    alert("What Nana entering blank?");
                    document.getElementById("weather-tracker").style['border-radius'] = "20px";
                    document.getElementById("city-name").innerHTML = "Atleast enter something in the input nana";
                    document.getElementById("city-name").style.display = "block";
                    document.getElementById("icon").style.display = "none";
                    document.getElementById("iconholder").style.display = "none";
                }
                else{
                    document.getElementById("city-name").innerHTML = `${city}`;
                    document.getElementById("city-name").style.display = "block";
                    cardholder.style.display = "flex";
                    document.getElementById("weather-tracker").style['border-radius'] = "50px";
                    document.getElementById("main").innerHTML = `Main : ${data.weather[0].main}`;
                    document.getElementById("description").innerHTML = `Description : ${data.weather[0].description}`;
                    document.getElementById("temprature").innerHTML = `Temprature : ${data.main.temp}K`;
                    document.getElementById("temp-max").innerHTML = `Maximum-Temprature : ${data.main.temp_max}K`;
                    document.getElementById("temp-min").innerHTML = `Minimum-Temprature : ${data.main.temp_min}K`;
                    document.getElementById("wind-speed").innerHTML = `Wind-Speed : ${data.wind.speed}`;
                    document.getElementById("wind-deg").innerHTML = `Wind-Degree : ${data.wind.deg}`;
                    document.getElementById("visibility").innerHTML = `Visibility : ${data.visibility}`;
                    document.getElementById("pressure").innerHTML = `Pressure : ${data.main.pressure}`;
                    document.getElementById("humidity").innerHTML = `Humidity : ${data.main.humidity}`;
                    document.getElementById("city").style["margin-bottom"] = "25px";
                    document.getElementById("btn").style["margin-bottom"] = "25px";
                    document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    document.getElementById("icon").style.display = "block";
                    document.getElementById("iconholder").style.display = "block";
                    document.getElementById("foot").style["margin-top"]="75px";
                    if (data.wind.gust != undefined) {
                        document.getElementById("wind-gust").innerHTML = `Wind-Gust : ${data.wind.gust}`;
                        document.getElementById("wind-gust").style.display = `block`;
                        console.log(data);
                    }
                    else {
                        document.getElementById("wind-gust").style.display = "none";
                        console.log(data);
                    }
                }
            }
        })
}

let lst1 = ["delhi", "bangalore", "chennai", "mumbai"]
let lst2 = ["temp", "main", "pressure", "speed", "visibility"]
let lst = [""]


for (let i = 0; i < 4; i++) {
    let api2 = `https://api.openweathermap.org/data/2.5/weather?q=${lst1[i]}&appid=4d09cd0e0c359927e26a1df8e5a0de90`
    fetch(api2)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            
            for (let j = 0; j < 4; j++) {
                let lst3 = [`Temprature : ${data.main.temp}K`,`Main : ${data.weather[0].main}`,`Pressure : ${data.main.pressure}`,`Wind-Speed : ${data.wind.speed}`]
                document.getElementById(`${lst1[i]}-${lst2[j]}`).innerHTML = lst3[j];
            }
        })

}