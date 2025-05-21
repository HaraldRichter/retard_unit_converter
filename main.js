const converterGroup = document.getElementById("converter-group"); // The HTML-section that contains the converters
const checkboxGroup = document.getElementById("checkbox-group"); // The HTML-section that contains the checkboxes
const openCheckboxesBtn = document.getElementById("open-checkboxes-btn");
const activeRetardUnitsListFromLocalStorage = JSON.parse(localStorage.getItem("myActiveRetardUnits"))

/**
 * The converters-array gets filled by running initializeConverters(). It then contains the HTML-code for all the converters.
 */ 
let converters = [];

/**
 * List of all units that can be converted.
 * To add another unit, it just has to be added to this list and to the necessary conversion-tables in convertToNonRetard() and getNonRetardedUnit(). 
 * Everything else is then handeled automatically, as the HTML-code is built dynamically.
 */
const retardUnitsList = [
    "feet",
    "inch",
    "pounds",
    "miles",
    "pint",
    "helicopter",
];

/**
 * Creates a list of all converters that are activated by the user. Deactivated converters are hidden.
 * The list gets saved to the browser cache, so that the user can modify the standard settings according to his own preferences.
 * If there is nothing saved to the cache, the default setting is ["feet", "inch", "pounds"]. 
 */
let activeRetardUnitsList;
if (activeRetardUnitsListFromLocalStorage) {
    activeRetardUnitsList = activeRetardUnitsListFromLocalStorage;
} else {
    activeRetardUnitsList = ["feet", "inch", "pounds"];
}

/**
 * INITIALIZATION: The checkboxes and converters are dynamically rendered.
 */
initializeConverters(retardUnitsList, activeRetardUnitsList);

initializeCheckboxes(retardUnitsList, activeRetardUnitsList);



 
// --------------- INITIALIZATION FUNCTIONS: -------------------------



/**
 * Creates the converters. A converter consists of an input-field for the value of the retard-unit and an output-field that shows the corresponding non-retarded value.
 * The output is generated and updated instantly (on input).
 * Individual converters can be activated or deactivated. A deactivated converter gets hidden by setting its display-value to "none".
 * 
 * @param {Array} retardUnitsList List of all retard units that can be converted
 * @param {Array} activeRetardUnitsList List of units currently activated to show the converter
 */
function initializeConverters(retardUnitsList, activeRetardUnitsList) {

    // Creates the HTML for every converter
    retardUnitsList.forEach((retardUnit) => {
        converters += `
            <div class="converter" id="${retardUnit}" style="display: ${getDisplay(
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

    // Updates the inner HTML of the converterGroup with the previously created HTML so that the converters get rendered
    converterGroup.innerHTML = converters;

    // Selects all converters
    converters = document.querySelectorAll(".converter");

    // Adds functionality
    converters.forEach((container) => {
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


/**
 * Creates the checkboxes to activate/deactivate individual converters.
 * Activation/deactivation is handled by setting a converter's display-value to "" (which means, is is shown) or "none".
 * 
 * @param {Array} retardUnitsList List of all retard units that can be converted
 * @param {Array} activeRetardUnitsList List of units currently activated to show the converter
 */
function initializeCheckboxes(retardUnitsList, activeRetardUnitsList) {
    let checkboxes =
        "<legend>Which retard units do you want to convert?</legend>"; // The legend is created here so it doesn't get overridden later on.
    
    // Creates the HTML-code for each checkbox. If the corresponding unit is in the activated-List, the checkbox is checked.
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

    // Set the innter HTML of the checkboxGroup to the previously created HTML to render the checkboxes  
    checkboxGroup.innerHTML = checkboxes;

    // Get all the recently created checkboxes
    const retardCheckboxes = document.querySelectorAll(".retard-checkbox");

    // Add functionality to the checkboxes: If a checkbox is checked, the corresponding converter is displayed, if it's unchecked, the converter gets hidden
    retardCheckboxes.forEach((checkbox) => {
        const converter = document.getElementById(checkbox.name);
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                converter.style.display = "";
                // Update the activeRetardUnitsList and save it to the browser cache
                activeRetardUnitsList.push(checkbox.name);
                localStorage.setItem("myActiveRetardUnits", JSON.stringify(activeRetardUnitsList));
            } else {
                converter.style.display = "none";
                // Update the activeRetardUnitsList and save it to the browser cache
                removeItem(activeRetardUnitsList, checkbox.name);
                localStorage.setItem("myActiveRetardUnits", JSON.stringify(activeRetardUnitsList));
            }
        });
    });
}

openCheckboxesBtn.addEventListener("click", function() {
    if (checkboxGroup.style.display === "") {
        openCheckboxesBtn.innerHTML = `More Retards here &darr;`
        checkboxGroup.style.display = "none"
    } else {
        openCheckboxesBtn.textContent = "Close"
        checkboxGroup.style.display = ""
    }
})

/*
----------------- HELPER FUNCTIONS ------------------------ 
*/

/**
 * Calculates the metric value according to the retard value
 * 
 * @param {String} retardUnit the retard unit to convert from
 * @param {number} value the retarded value input to be converted
 * @returns the metric value as a floating point number with two decimals
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

/**
 * Returns the metric unit to which each retard unit gets converted
 * 
 * @param {String} retardUnit the retard unit
 * @returns the corresponding metric unit
 */
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

/**
 * Determines the "display"-value of a converter
 * 
 * @param {boolean} value true, if the converter's unit is in the activated-list
 * @returns the display-value of "block" (converter active) or "none" (converter deactivated)
 */
function getDisplay(value) {
    if (value) {
        return "block";
    } else {
        return "none";
    }
}

/**
 * Removes a specific item from an array by modifying the array itself
 * 
 * @param {Array} array the array to be modified
 * @param {String} itemToRemove the item to be removed from the array
 */
function removeItem(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
}