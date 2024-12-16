 // Wait for the entire page to load

 document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.getElementById("current-form");
    // Listen for the submit event
    form.addEventListener("submit", calculateYaw);
  });

  function divideByEight(a) {
    if(a.length > 0)
    {
    a /= 8;
    a = (Math.round (a * 1000.0)) / 1000.0;
    return a + "";
    }
    return "";
  }

  function calculateYaw(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    document.getElementById("result").innerHTML = "";
    document.getElementById("netherstart").innerHTML = "";
    document.getElementById("netherend").innerHTML = "";
    // Get the values from the form inputs
    let locX = data.get("locX");
    let locZ = data.get("locZ");
    let destX = data.get("destX");
    let destZ = data.get("destZ");
    const netherEquivCurrent=document.querySelector('#netherEquivCurrent').checked;
    const netherEquivDest = document.querySelector('#netherEquivDest').checked;
    if(netherEquivCurrent)
    {
      
      locX = divideByEight(locX);
      locZ = divideByEight(locZ);
    }
    if(netherEquivDest)
    {
        destX = divideByEight(destX);
	    destZ = divideByEight(destZ);
      }
    if(netherEquivCurrent && !(locX.length === 0 && locZ.length === 0))
	  {
		 xString = locX.length === 0 ? "" : "X: " + `${locX}`;
		 zString = locZ.length === 0 ? "" : "Z: " + `${locZ}`;
	if (xString.length > 0 && zString.length > 0)
        document.getElementById("netherstart").innerHTML = "Start from here in the Nether Biome: " + `${xString}` + ", "  + `${zString}`;
	else
	 document.getElementById("netherstart").innerHTML = "Start from here in the Nether Biome: " + `${xString}` + `${zString}`;
	  }
     if(netherEquivDest && !(destX.length === 0 && destZ.length === 0))
	  {
		 xString = destX.length === 0 ? "" : "X: " + `${destX}`;
		 zString = destZ.length === 0 ? "" : "Z: " + `${destZ}`;
	if (xString.length > 0 && zString.length > 0)
        document.getElementById("netherend").innerHTML = "Start from here in the Nether Biome: " + `${xString}` + ", "  + `${zString}`;
	else
	 document.getElementById("netherend").innerHTML = "Start from here in the Nether Biome: " + `${xString}` + `${zString}`;
	  }

    // Build the url
    processIt = (locX.length > 0 && locZ.length > 0 && destX.length > 0 && destZ.length > 0);
    if (processIt) {
    const url = new URL(`${window.location.href}` + "calculate");
    url.searchParams.append("xcurrent", parseFloat(locX));
    url.searchParams.append("zcurrent", parseFloat(locZ));
    url.searchParams.append("xdest", parseFloat(destX));
    url.searchParams.append("zdest", parseFloat(destZ));

    fetch(url, { method: "GET", mode: "no-cors" })
      .then((response) => response.text()) // Get the yaw as plain text
      .then((data) => {
	if (processIt)
        	document.getElementById(
          	"result"
        	).innerHTML = `Calculated Yaw: ${data} :)`;
       })
      .catch((error) => console.error("Error:", error));


    }

    }
