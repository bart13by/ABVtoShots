function calculateShots()
{
  let ozToMl = 29.57;
  let mlShot = 20;
  let ozShot = .6;
  let inUnits = document.getElementById("inUnits").value;
  let inVolume = document.getElementById("vol").value;
  let abv = document.getElementById("abv").value / 100;
  let mlVolume = inUnits === "ml" ? inVolume : inVolume * ozToMl;
  let ozVolume = inUnits === "oz" ? inVolume : inVolume / ozToMl;
  let mlAlcohol = abv * mlVolume;
  let ozAlcohol = abv * ozVolume;
  let ozShots = ozAlcohol / ozShot;
  let mlShots = mlAlcohol / mlShot;
  
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML = 
    `Volume: ${Math.round(mlVolume * 100)/100} ml; ${Math.round(ozVolume *100)/100} oz<br />` +
    `Alcohol: ${Math.round(mlAlcohol * 100)/100} ml; ${Math.round(ozAlcohol * 100)/100} oz<br>`+
    `1.5 oz shots: ${Math.round(ozShots * 100)/100} <br>`+
    `50 ml shots: ${Math.round(mlShots * 100)/100}`;

}