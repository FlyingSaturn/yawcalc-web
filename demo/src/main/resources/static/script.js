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

    // Build the url
    const url = new URL("http://localhost:8080/calculate");
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