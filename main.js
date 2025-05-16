const checkboxGroup = document.getElementById("checkbox-group");
const conversionContainerGroup = document.getElementById("converter-group");

// Die Liste der Conversion Containers ist Anfangs noch leer. Sie wird dann im Initialisierungs-Step befüllt:
var conversionContainers;

/* 
Die Retard Units List ist die Liste der Retard Units, die sich konvertieren lassen. Um eine neue Unit hinzuzufügen, muss sie lediglich in diese Liste
sowie in die Umrechnungstabellen - die Funktionen convertToNonRetard() und getNonRetardedUnit() - eingetragen werden. Das HTML wird dann dynamisch erzeugt.
*/
const retardUnitsList = [
    "feet",
    "inch",
    "pounds",
    "miles",
    "pint",
    "helicopter",
];
// Erstellt eine Liste aller Retard Units, für die ein Conversion-Container gebaut werden soll.
// Die Liste ist dann im Browser zu speichern. Standard-Anfangseinstellung sind Feet, Inch, Pounds.
let activeRetardUnitsList = ["feet", "inch", "pounds"];

// Die Checkboxen, mit denen man die einzelnen Conversion-Container an- und abwählen kann, werden anhand der retardUnitList erstellt:
initializeCheckboxes(retardUnitsList, activeRetardUnitsList);

// Mit Hilfe der Retard-Unit-Liste werden dann die benötigten Container gerendert:
initializeConverters(retardUnitsList, activeRetardUnitsList);

/* 
--------------- INITIALISIERUNGSFUNKTIONEN: -------------------------
*/
function initializeCheckboxes(retardUnitsList, activeRetardUnitsList) {
    let checkboxes =
        "<legend>Which retard units do you want to convert?</legend>"; // Damit die Fieldset-Legende nicht überschrieben wird, setzen wir sie hier an den Anfang der HTML-Liste.
    retardUnitsList.forEach((retardUnit) => {
        if (activeRetardUnitsList.includes(retardUnit)) {
            checkboxes += `
            <div class="checkbox-container">
                <input
                    type="checkbox"
                    class="retard-checkbox"
                    id="checkbox-${retardUnit}"
                    name="${retardUnit}"
                    checked

                />
                <label for="checkbox-${retardUnit}">${retardUnit}</label>
            </div>
        `;
        } else {
            checkboxes += `
            <div class="checkbox-container">
                <input
                    type="checkbox"
                    class="retard-checkbox"
                    id="checkbox-${retardUnit}"
                    name="${retardUnit}"
                />
                <label for="checkbox-${retardUnit}">${retardUnit}</label>
            </div>
        `;
        }
    });
    checkboxGroup.innerHTML = checkboxes;

    const retardCheckboxes = document.querySelectorAll(".retard-checkbox");

    retardCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                let converter = document.getElementById(checkbox.name);
                converter.style.display = "block";
                conversionContainers.forEach((converter) => {
                    console.log(converter.id + " - " + converter.style.display);
                });
            } else {
                let converter = document.getElementById(checkbox.name);
                converter.style.display = "none";
            }
        });
    });
}

function initializeConverters(retardUnitsList, activeRetardUnitsList) {
    let converters = "";
    retardUnitsList.forEach((retardUnit) => {
        converters += `
            <div class="conversion-container" id="${retardUnit}" style="display: ${getDisplay(
            activeRetardUnitsList.includes(retardUnit)
        )}">
                <input type="number" class="retard" id="input-${retardUnit}" />
                <label for="${retardUnit}">${retardUnit}</label>
                <label for="${retardUnit}"> = <span class="non-retard" id="output-${retardUnit}">0</span> ${getNonRetardedUnit(
            retardUnit
        )} </label>
        </div>
        `;
    });
    conversionContainerGroup.innerHTML = converters;
    conversionContainers = document.querySelectorAll(".conversion-container");

    conversionContainers.forEach((container) => {
        const retardUnit = container.id;
        const inputField = document.getElementById("input-" + retardUnit);
        const outputField = document.getElementById("output-" + retardUnit);

        container.addEventListener("input", function () {
            const convertedValue = convertToNonRetard(
                retardUnit,
                inputField.value
            );
            outputField.textContent = convertedValue;
        });
    });
}

/*
----------------- HELPER FUNCTIONS ------------------------ 
*/
function convertToNonRetard(retardUnit, value) {
    switch (retardUnit) {
        case "feet":
            return parseFloat(value * 0.3048).toFixed(2);
        case "inch":
            return parseFloat(value * 2.54).toFixed(2);
        case "pounds":
            return parseFloat(value * 0.45).toFixed(2);
        default:
            return parseFloat(value).toFixed(2);
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
        default:
            return "non-retarded";
    }
}

function getDisplay(value) {
    if (value) {
        return "block";
    } else {
        return "none";
    }
}
