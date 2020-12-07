window.addEventListener("load", () => {
  let long;
  let lat;
  let tempratureDescription = document.querySelector(".temprature-description"),
    tempratureDegree = document.querySelector(".temprature-degree"),
    locationTimezone = document.querySelector(".location-timezone"),
    tempratureSection = document.querySelector(".temprature");
  const tempratureSpan = document.querySelector(".temprature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // set dom elements from the api
          tempratureDegree.textContent = temperature;
          tempratureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // set icon
          setIcons(icon, document.querySelector(".icon"));
          // forumula for celsius
          let celsuis = (temperature - 32) * (5 / 9);
          // change temprature to celsius
          tempratureSection.addEventListener("click", () => {
            if (tempratureSpan.textContent === "F") {
              tempratureSpan.textContent = "C";
              tempratureDegree.textContent = Math.floor(celsuis);
            } else {
              tempratureSpan.textContent = "F";
              tempratureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
