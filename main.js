const addButton = document.getElementById("add-btn");
const conversionContainerGroup = document.getElementById(
    "conversion-container-group"
);

// Erstellt eine Liste aller Retard Units, für die ein Conversion-Container gebaut werden soll.
// Die Liste ist dann im Browser zu speichern. Standard-Anfangseinstellung sind Feet, Inch, Pounds.
let retardUnitsList = ["feet", "inch", "pounds"];
initializeContainers(retardUnitsList);

function initializeContainers(retardUnitsList) {
    let containers = "";
    retardUnitsList.forEach((retardUnit) => {
        containers += `
            <div class="conversion-container" id="${retardUnit}">
                <label for="${retardUnit}">${retardUnit}:</label>
                <input type="number" class="retard" id="input-${retardUnit}" />
                <label for="${retardUnit}">to ${getNonRetardedUnit(retardUnit)}</label>
                <p class="non-retard" id="output-${retardUnit}"></p>
            </div>
        `;
    });
    conversionContainerGroup.innerHTML = containers;
}

// Erstellt ein Array mit allen Conversion-Containern:
let conversionContainers = document.querySelectorAll(".conversion-container");

// Definiert anschließend das Verhalten für alle Conversion-Containers:
conversionContainers.forEach((container) => {
    console.log("Container-id: " + container.id);
    const retardUnit = container.id;
    console.log("Retard unit: " + retardUnit);

    const inputField = document.getElementById("input-" + retardUnit);
    const outputField = document.getElementById("output-" + retardUnit);
    const nonRetardUnit = getNonRetardedUnit(retardUnit);

    container.addEventListener("input", function () {
        const convertedValue = convertToNonRetard(retardUnit, inputField.value);
        outputField.textContent = convertedValue + " " + nonRetardUnit;
        console.log(inputField.value);
        console.log(convertedValue);
    });
});

// TODO: Füge einen Conversion-Container mit bestimmten Parametern dem Container-Array hinzu
// function addConversionContainer(retardUnit) {

// }

// TODO: Lösche einen bestimmten Conversion-Container aus dem Array

// Innere Funktion(en):
function convertToNonRetard(retardUnit, value) {
    switch (retardUnit) {
        case "feet":
            return parseFloat(value * 0.3048).toFixed(2);
        case "inch":
            return parseFloat(value * 2.54).toFixed(2);
        case "pounds":
            return parseFloat(value * 0.45).toFixed(2);
    }
}

function getNonRetardedUnit(retardUnit) {
    switch (retardUnit) {
        case "feet":
            return "m";
        case "inch":
            return "cm";
        case "pounds":
            return "kg";
    }
}
