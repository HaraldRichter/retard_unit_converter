
const conversionContainers = document.querySelectorAll(".conversion-container");

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


function convertToNonRetard(retardUnit, value) {
    switch (retardUnit) {
        case "inch":
            return value * 2.54;
        case "pounds":
            return value * 0.45;
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
