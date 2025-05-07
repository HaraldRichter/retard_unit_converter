const inputInch = document.getElementById("input-inch");
const outputInch = document.getElementById("output-inch");
const inputPounds = document.getElementById("input-pounds");
const outputPounds = document.getElementById("output-pounds");


inputInch.addEventListener("input", function() {
    let output = convertToNonRetard("inch", inputInch.value);
    outputInch.textContent = output;
})

inputPounds.addEventListener("input", function() {
    let output = convertToNonRetard("pounds", inputPounds.value);
    outputPounds.textContent = output;
})

function convertToNonRetard(retardUnit, value) {
    if (retardUnit === "inch") {
        return value * 2.54
    } else if (retardUnit === "pounds") {
        return value * 0.45
    }
}