document.getElementById("searchName").addEventListener("click", function() {

    const city = document.getElementById("cityName").value.trim();

    if (city !== "") {
        window.location.href = "result.html?city=" + city;
    } else {
        alert("Please enter a city name!");
    }
});
