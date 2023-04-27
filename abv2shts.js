function dotheMath(inVolume = 0, abv_arg = 0, inUnits='oz'){
  if (inVolume <= 0 || abv_arg <= 0) { 
      console.error("Volume and ABV must have positive values.");
      return; 
  }
  if (!['ml','oz'].includes(inUnits)){
    console.error(`Units must be ml or oz; you sent ${inUnits}.`);
    return;
  }
  const abv = abv_arg / 100;
  const ozToMl = 29.57;
  const mlShot = 20;
  const ozShot = .6;
  const mlVolume = inUnits === "ml" ? inVolume : inVolume * ozToMl;
  const ozVolume = inUnits === "oz" ? inVolume : inVolume / ozToMl;
  return {
        mlVolume : mlVolume.toLocaleString('en-US', {maximumFractionDigits: 2}),
        ozVolume : ozVolume.toLocaleString('en-US', {maximumFractionDigits: 2}),
        mlAlcohol : (abv * mlVolume).toLocaleString('en-US', {maximumFractionDigits: 2}),
        ozAlcohol : (abv * ozVolume).toLocaleString('en-US', {maximumFractionDigits: 2}),
        ozShots : ((abv * mlVolume) / ozShot).toLocaleString('en-US', {maximumFractionDigits: 2}),
        mlShots : ((abv * ozVolume) / mlShot).toLocaleString('en-US', {maximumFractionDigits: 2})
  }
  
}

function calculateShots()
{
  let inUnits = document.getElementById("inUnits").value;
  let inVolume = document.getElementById("vol").value;
  let abv = document.getElementById("abv").value / 100;
  if (inVolume == 0 || abv == 0) 
  	{ 
  		return; 
	}
  const data = dotheMath(inVolume, abv, inUnits);
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = 
`

<div class="total_volume">Input Volume: ${data.mlVolume} ml; ${data.ozVolume} oz</div>
<div class="alc_volume">Alcohol: ${data.mlAlcohol} ml; ${data.ozAlcohol} oz</div>
<div class="shots"><span class="shots_label">1.5 oz shots</span><span class="shots_value"> ${data.ozShots} </span></div>
<div class="shots"><span class="shots_label">50 ml shots<span><span class="shots_val"> ${data.mlShots}</span></div>
`;

}