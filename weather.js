// root.style.setProperty("--pseudo-bg", `url("images/${}.jpg") no-repeat center center/cover`);

function cityfunc() {
    let city = document.getElementById("city").value;
    if (city.trim().length == 0) {
        alert("Atleast enter something in input");
        // alert("Showing the weather of Bangalore because of blank entry");
        document.getElementById("weather-result").style.display = "none";
        document.querySelector(":root").style.setProperty("--top-val", `875px`);
        document.querySelector(":root").style.setProperty("--top-val-mobile", `875px`);
        document.querySelector(":root").style.setProperty("--top-val-mobile", `775px`);
        document.getElementById("city").value = "";
        // document.querySelector(":root").style.setProperty("--pseudo-bg", `none`);
        // document.querySelector(":root").style.setProperty("--pseudo-bg-mobile", `none`);
        // document.getElementById("city-weather-info").style.display = "none";
        // document.getElementById("city-head").innerHTML = `No City Entered`;
        // checktime()
        // window.scrollTo(0, 550);

    }
    else {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d09cd0e0c359927e26a1df8e5a0de90`
        fetch(api)
            .then((res) => {
                return res.json();
            })
            .then(data => {
                if (data.cod == 404) {
                    document.getElementById("weather-result").style.display = "flex";
                    document.getElementById("city-weather-info").style.display = "none";
                    document.querySelector(":root").style.setProperty("--top-val", `1305px`);
                    document.querySelector(":root").style.setProperty("--top-val-mobile", `1405px`);
                    document.querySelector(":root").style.setProperty("--top-val3", `1405px`);
                    document.querySelector(":root").style.setProperty("--pseudo-bg", `none`);
                    document.querySelector(":root").style.setProperty("--pseudo-bg-mobile", `none`);
                    alert("This city exists only in your imagination");
                    document.getElementById("city-head").innerHTML = `${city}`;
                    document.getElementById("date").innerHTML = "does not";
                    document.getElementById("time").innerHTML = "EXISTS";
                    window.scrollTo(0, 550);
                    document.getElementById("city").value = "";
                }
                else {
                    document.getElementById("weather-result").style.display = "flex";
                    document.getElementById("city-weather-info").style.display = "flex";
                    document.querySelector(":root").style.setProperty("--pseudo-bg", `url("images/${data.weather[0].icon}.jpg") no-repeat center center/cover`);
                    document.querySelector(":root").style.setProperty("--pseudo-bg-mobile", `url("images/${data.weather[0].icon}m.jpg") no-repeat center center/cover`);
                    document.querySelector(":root").style.setProperty("--top-val", `1305px`);
                    document.querySelector(":root").style.setProperty("--top-val-mobile", `1405px`);
                    document.querySelector(":root").style.setProperty("--top-val3", `1405px`);
                    document.getElementById("city-head").innerHTML = `${city} , ${data.sys.country}`;
                    checktime()
                    let temp = Math.round(data.main.temp - 273)
                    document.getElementById("info-1").innerHTML = `${temp} C`;
                    document.getElementById("info-2").innerHTML = `${data.main.pressure} hPa`;
                    document.getElementById("info-3").innerHTML = `${data.weather[0].description}`;
                    document.getElementById("info-4").innerHTML = `${data.wind.speed} m/s`;
                    document.getElementById("info-5").innerHTML = `${data.visibility} m`;
                    document.getElementById("info-6").innerHTML = `${data.main.humidity} %`;
                    document.getElementById("weather-desc-icon").src = `images/${data.weather[0].icon}.svg`
                    window.scrollTo(0, 550);
                    document.getElementById("city").value = "";
                    
                }
            })
    }
}
function checktime() {
    let date = new Date()
    let minutes = date.getMinutes();
    let month = date.getMonth() + 1;
    let dat = date.getDate();
    if (month < 10) {
        month = "0" + month
    }
    if (dat < 10) {
        dat = "0" + dat
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }

    document.getElementById("time").innerHTML = `${date.getHours()}:${minutes} IST`;
    document.getElementById("date").innerHTML = `${dat}-${month}-${date.getFullYear()}  |  `;
}
checktime();

let lst1 = ["delhi", "bangalore", "chennai", "mumbai"]
let lst2 = ["temp", "main", "pressure", "speed"]
let lst = [""]


for (let i = 0; i < 4; i++) {
    let api2 = `https://api.openweathermap.org/data/2.5/weather?q=${lst1[i]}&appid=4d09cd0e0c359927e26a1df8e5a0de90`
    fetch(api2)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            let temp = Math.round(data.main.temp - 273);
            for (let j = 0; j < 4; j++) {
                let lst3 = [`TEMPRATURE : ${temp}C`, `MAIN : ${data.weather[0].main}`, `PRESSURE : ${data.main.pressure} hPa`, `WIND-SPEED : ${data.wind.speed} m/s`]
                document.getElementById(`${lst1[i]}-${lst2[j]}`).innerHTML = lst3[j];
            }
        })

}

const city = document.getElementById("city");
city.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        document.getElementById("btn").click();
    }
})

function sendtotop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function show(city) {
    document.getElementById(city).style.display = "flex";
    document.getElementById(city).style.height = "0px";
    for (let i = 0; i < 4; i++) {
        document.querySelectorAll(`.${city}-info`)[i].style.display = "none";
    }
    document.getElementById(city).style.animation = "height 1.5s forwards";

    document.getElementById(`${city}-head`).style.animation = "color-change-head 2.5s ease-in-out 0s infinite alternate forwards";
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            document.querySelectorAll(`.${city}-info`)[i].style.display = "block";
            document.getElementById(city).style.height = "216px";
            document.querySelectorAll(`.${city}-info`)[i].style.color = "rgba(0,0,0,0)";
            if (document.getElementById(city).style.height === "216px") {
                document.querySelectorAll(`.${city}-info`)[i].style.animation = "transparent-color 1s forwards";
            }
        }
    }, 1400)
}
function hide(city) {
    
    if (document.getElementById(city).style.height == "216px") {
        if (document.querySelector(`.${city}-info`).style.color == "white") {
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    document.querySelectorAll(`.${city}-info`)[i].style.animation = "color-transparent 1s forwards";
                }
                
                setTimeout(() => {
                    for (let i = 0; i < 4; i++) {
                        document.querySelectorAll(`.${city}-info`)[i].style.display = "none";
                    }
                    document.getElementById(city).style.animation = "unheight 1.5s forwards";
                    setTimeout(() => {
                        document.getElementById(city).style.display = "none";
                        document.getElementById(`${city}-head`).style.animation = "none";
                    }, 2000)
                }, 1000, city);
            }, 1000)
        }
        else {
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    document.querySelectorAll(`.${city}-info`)[i].style.animation = "color-transparent 1s forwards";
                }
                setTimeout(() => {
                    for (let i = 0; i < 4; i++) {
                        document.querySelectorAll(`.${city}-info`)[i].style.display = "none";
                    }
                    document.getElementById(city).style.animation = "unheight 1.5s forwards";
                    setTimeout(() => {
                        document.getElementById(city).style.display = "none";
                        document.getElementById(`${city}-head`).style.animation = "none";
                    }, 1500)
                }, 1000, city);
            }, 2000)
        }
    }
    else {
        setTimeout(() => {
            for (let i = 0; i < 4; i++) {
                document.querySelectorAll(`.${city}-info`)[i].style.animation = "color-transparent 1s forwards";
            }
            setTimeout(() => {
                for (let i = 0; i < 4; i++) {
                    document.querySelectorAll(`.${city}-info`)[i].style.display = "none";
                }
                document.getElementById(city).style.animation = "unheight 1.5s forwards";
                setTimeout(() => {
                    document.getElementById(city).style.display = "none";
                    document.getElementById(`${city}-head`).style.animation = "none";
                }, 1500)
            }, 1000, city);
        }, 3000)
    }
}
