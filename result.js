const apiKey = "abea1cf2010f3e66068173fda1a4494f";

const city = new URLSearchParams(window.location.search).get("city");

const currentWeather = document.getElementById("currentWeather");
const nextContainer = document.getElementById("nextContainer");

function setBackgroundColor(condition) {
    let color = "";
    if (condition.includes("Clear")) color = "linear-gradient(to right, #f6d365, #fda085)";
    else if (condition.includes("Cloud")) color = "linear-gradient(to right, #d7d2cc, #304352)";
    else if (condition.includes("Rain")) color = "linear-gradient(to right, #4b79a1, #283e51)";
    else if (condition.includes("Snow")) color = "linear-gradient(to right, #e6dada, #274046)";
    else if (condition.includes("Thunder")) color = "linear-gradient(to right, #3a6186, #89253e)";
    else color = "linear-gradient(to right, #4facfe, #00f2fe)";
    document.body.style.background = color;
}

function loadCurrent() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            const cond = data.weather[0].main;
            setBackgroundColor(cond);

            currentWeather.innerHTML = `
                <h1>${data.name}</h1>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${cond}">
                <p><b>Temperature:</b> ${data.main.temp}°C</p>
                <p><b>Humidity:</b> ${data.main.humidity}%</p>
                <p><b>Wind:</b> ${data.wind.speed} m/s</p>
                <p><b>Condition:</b> ${cond}</p>
            `;
        })
        .catch(err => {
            currentWeather.innerHTML = `<p style="color:red;">City not found!</p>`;
        });
}

function loadNext5() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("Forecast not found");
            return res.json();
        })
        .then(data => {
            nextContainer.innerHTML = "";
            let count = 0;
            for (let i = 0; i < data.list.length; i += 8) {
                if (count >= 5) break;
                const item = data.list[i];
                nextContainer.innerHTML += `
                    <div class="day-card">
                        <h4>${item.dt_txt.split(" ")[0]}</h4>
                        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].main}">
                        <p>${item.main.temp}°C</p>
                        <p>${item.weather[0].main}</p>
                    </div>
                `;
                count++;
            }
        })
        .catch(err => {
            nextContainer.innerHTML = `<p style="color:red;">Forecast not available.</p>`;
        });
}

loadCurrent();
loadNext5();
