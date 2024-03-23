for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid='${i}'][cid='${j}']`);
        cell.addEventListener("blur", (e) => {

            //blur  works before click event
            // this will trigger when we type something on one cell
            // and click on other this will set that data for address bar

            //take cell value from getVaues
            // and then take cell and its props fro activeCell function
            let [cell, cellProp] = activeCell(currentAddress.value)

            let enteredData = cell.innerText;
            if (enteredData === cellProp.value) return;


            // set the content

            cellProp.value = enteredData
            removeChildFromParent(cellProp.formula)
            // if data modified update children 
            //cellProp.formula = ""
            updateChildrenCells(currentAddress.value)
        })
    }
}



// now on enter this will trigger the calculation
// two types of calculation

// 1.normal expression 10+20
// 2.dependency expression (A1+A2)

// formula evaluation


formulaBar.addEventListener("keydown", (e) => {
    let inputFormula = formulaBar.value
    if (e.key === "Enter" && formulaBar.value) {


        // if change in formula break the parent child relation and then evaluate new formula
        let address = addressBarInput.value

        let [cell, cellProp] = activeCell(address)
        if (inputFormula !== cellProp.formula) {
            removeChildFromParent(cellProp.formula)
        }

        let evaluated = evaluateFormula(inputFormula)

        setUiCellandProp(evaluated, inputFormula, address)

        addChildToParent(inputFormula)
        updateChildrenCells(address)
    }
})

function updateChildrenCells(parentAddress) {

    let [parentCell, parentCellProp] = activeCell(parentAddress)
    let children = parentCellProp.children;

    for (let i = 0; i < children.length; i++) {
        let childAddress = children[i];
        let [childCell, childCellProp] = activeCell(childAddress)
        let childFormula = childCellProp.formula
        let evaluated = evaluateFormula(childFormula)

        setUiCellandProp(evaluated, childFormula, childAddress)

        updateChildrenCells(childAddress)

    }


}

function addChildToParent(formula) {
    let childAddress = addressBarInput.value
    let encodedFormula = formula.split(" ")
    for (let i = 0; i < encodedFormula.length; i++) {
        let encodedValue = encodedFormula[i].charCodeAt(0);
        if (encodedValue >= 65 && encodedValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i])
            parentCellProp.children.push(childAddress)
        }
    }
}
function removeChildFromParent(formula) {
    let childAddress = addressBarInput.value
    let encodedFormula = formula.split(" ")
    for (let i = 0; i < encodedFormula.length; i++) {
        let encodedValue = encodedFormula[i].charCodeAt(0);
        if (encodedValue >= 65 && encodedValue <= 90) {
            let [parentCell, parentCellProp] = activeCell(encodedFormula[i])
            let idx = parentCellProp.children.indexOf(childAddress)
            parentCellProp.children.splice(idx, 1)
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for (let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if (asciiValue >= 65 && asciiValue <= 90) {
            let [cell, cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setUiCellandProp(evaluatedValue, formula, address) {


    let [cell, cellProp] = activeCell(address)


    // update the UI
    cell.innerText = evaluatedValue
    cellProp.value = evaluatedValue
    cellProp.formula = formula
}