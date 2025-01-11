buttonInvisible('result-copy');
buttonInvisible('end-copy');
buttonInvisible('start-copy');
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const form = document.getElementById("current-form");
    // Listen for the submit event
    form.addEventListener("submit", calculateYaw);
});

function divideByEight(a) {
    if (a.length > 0) {
        a /= 8;
        a = (Math.round(a * 1000.0)) / 1000.0;
        return a + "";
    }
    return "";
}

function buttonVisible(elementid) {
    const x = document.getElementById(elementid);
    x.style.display = "block";
}

function buttonInvisible(elementid) {
    const x = document.getElementById(elementid);
    x.style.display = "none";
}

function copyInnerHTML(elementid) {
    console.log("Copying " + `${elementid}`);
    let text = document.getElementById(elementid).innerHTML;
    if (text.split(":").length - 1 == 1)
        text = text.substring(text.indexOf(":") + 1);
    else if (text.split(":").length - 1 == 2)
        text = text.substring(text.indexOf(":") + 1, text.lastIndexOf(":"));
    text = text.trim();
    navigator.clipboard.writeText(text);

    alert("Copied!");
}

function calculateYaw(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    document.getElementById("result").innerHTML = "";
    document.getElementById("netherstart").innerHTML = "";
    document.getElementById("netherend").innerHTML = "";
    buttonInvisible("start-copy");
    buttonInvisible("end-copy");
    buttonInvisible("result-copy");
    // Get the values from the form inputs
    let locX = data.get("locX");
    let locZ = data.get("locZ");
    let destX = data.get("destX");
    let destZ = data.get("destZ");
    const netherEquivCurrent = document.querySelector('#netherEquivCurrent').checked;
    const netherEquivDest = document.querySelector('#netherEquivDest').checked;
    if (netherEquivCurrent) {
        locX = divideByEight(locX);
        locZ = divideByEight(locZ);
    }
    if (netherEquivDest) {
        destX = divideByEight(destX);
        destZ = divideByEight(destZ);
    }
    const ficurrent = (netherEquivCurrent && !(locX.length === 0 && locZ.length === 0))
    const fidest = (netherEquivDest && !(destX.length === 0 && destZ.length === 0))
    if (ficurrent) {
        xString = locX.length === 0 ? "" : "X=" + `${locX}`;
        zString = locZ.length === 0 ? "" : "Z=" + `${locZ}`;
        buttonVisible("start-copy");
        if (xString.length > 0 && zString.length > 0)
            document.getElementById("netherstart").innerHTML = "Start from here in the Nether Biome: " + `${locX}` + ", " + `${locZ}`;
        else
            document.getElementById("netherstart").innerHTML = "Start from here in the Nether Biome: " + `${xString}` + `${zString}`;
    }
    if (fidest) {
        xString = destX.length === 0 ? "" : "X=" + `${destX}`;
        zString = destZ.length === 0 ? "" : "Z=" + `${destZ}`;
        buttonVisible("end-copy");
        if (xString.length > 0 && zString.length > 0)
            document.getElementById("netherend").innerHTML = "Destination in the Nether Biome: " + `${destX}` + ", " + `${destZ}`;
        else
            document.getElementById("netherend").innerHTML = "Destination in the Nether Biome: " + `${xString}` + `${zString}`;
    }

    // Build the url
    const processIt = (locX.length > 0 && locZ.length > 0 && destX.length > 0 && destZ.length > 0);
    console.log(processIt, locX, locZ, destX, destZ);
    if (processIt) {
        const url = new URL(`${window.location.href}` + "calculate");
        url.searchParams.append("xcurrent", parseFloat(locX));
        url.searchParams.append("zcurrent", parseFloat(locZ));
        url.searchParams.append("xdest", parseFloat(destX));
        url.searchParams.append("zdest", parseFloat(destZ));

        fetch(url, {
                method: "GET",
                mode: "no-cors"
            })
            .then((response) => response.text()) // Get the yaw as plain text
            .then((data) => {
                document.getElementById(
                    "result"
                ).innerHTML = `Calculated Yaw: ${data} :)`;
                buttonVisible("result-copy");
            })
            .catch((error) => console.error("Error:", error));


    }
    if (!ficurrent && !fidest && !processIt) {
        document.getElementById("result").innerHTML = `Either enter all the values</br>or tick the respective checkbox</br>after entering a value`;
    }
}
