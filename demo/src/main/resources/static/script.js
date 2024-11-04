 // Wait for the entire page to load

 document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.getElementById("current-form");
    // Listen for the submit event
    form.addEventListener("submit", calculateYaw);
  });
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
      locX /= 8;
      locX = (Math.round (locX * 1000.0)) / 1000.0; //Rounding off to 3 decimal places again
      locZ /= 8;
      locZ = (Math.round (locZ * 1000.0)) / 1000.0;
    }
    if(netherEquivDest)
      {
        destX /= 8;
        destX = (Math.round (destX * 1000.0)) / 1000.0;
        destZ /= 8;
        destZ = (Math.round (destZ * 1000.0)) / 1000.0;
      }
    // Build the url
    const url = new URL(`${window.location.href}` + "calculate");
    url.searchParams.append("xcurrent", locX);
    url.searchParams.append("zcurrent", locZ);
    url.searchParams.append("xdest", destX);
    url.searchParams.append("zdest", destZ);

    fetch(url, { method: "GET", mode: "no-cors" })
      .then((response) => response.text()) // Get the yaw as plain text
      .then((data) => {
        document.getElementById(
          "result"
        ).innerHTML = `Calculated Yaw: ${data} :)`;
        if(netherEquivCurrent)
          document.getElementById("netherstart").innerHTML = "Start from here in the Nether Biome: " + `${locX}` + ", "  + `${locZ}`;
        if(netherEquivDest)
          document.getElementById("netherend").innerHTML = "Go here in the Nether Biome: " + `${destX}` + ", "  + `${destZ}`; 
      })
      .catch((error) => console.error("Error:", error));
  }