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

    // Get the values from the form inputs
    const locX = data.get("locX");
    const locZ = data.get("locZ");
    const destX = data.get("destX");
    const destZ = data.get("destZ");
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
      })
      .catch((error) => console.error("Error:", error));
  }
