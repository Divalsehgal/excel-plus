let sheetDB = {}
let activeColorProp = "gray";
let inactiveColorProp = "";

 
const totalRows = document.querySelectorAll(".address-row-container .address-row");

const totalColumns = document.querySelectorAll(".address-col-container .address-col");

for (let i = 0; i < totalRows.length; i++) {
    for (let j = 0; j < totalColumns.length; j++) {
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            color: "#000000",
            bgColor: "#ffffff",
            fontFamily: "monospace",
            fontSize: "14",
            value: "",
            formula: "",
            children: [],
        }
        sheetDB[[i, j]] = cellProp;
    }
}


function activeCell(address) {
    let [r, c] = getValues(address);

    let cell = document.querySelector(`.cell[rid='${r}'][cid='${c}']`);
    let cellProp = sheetDB[[r, c]]

    return [cell, cellProp]


}

let boldProp = document.querySelector(".bold");

let italicProp = document.querySelector(".italic")

let underlineProp = document.querySelector(".underline")

let colorProp = document.querySelector(".input-color-text ")
let bgColorProp = document.querySelector(".input-color-fill")
let fontSizeProp = document.querySelector(".font-size-prop")
let fontFamilyProp = document.querySelector(".font-family-prop")
let alignmentProps = document.querySelectorAll(".alignment")
let leftAlignProp = alignmentProps[0]
let centerAlignProps = alignmentProps[1]
let rightAlignProps = alignmentProps[2]

const currentAddress = document.querySelector(".address-bar")
function getValues(address) {

    let rid = Number(address.slice(1) - 1);
    let cid = Number(address.charCodeAt(0)) - 65; 
    return [rid, cid];
}
boldProp.addEventListener("click", () => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.bold = !cellProp.bold
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
    boldProp.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})

italicProp.addEventListener("click", () => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : ""
    italicProp.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})



underlineProp.addEventListener("click", () => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none"
    underlineProp.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})


fontSizeProp.addEventListener("change", (e) => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.fontSize = e.target.value;
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSizeProp.value = cellProp.fontSize

})

fontFamilyProp.addEventListener("change", (e) => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.fontFamily = e.target.value;
    cell.style.fontFamily = cellProp.fontFamily
    fontFamilyProp.value = cellProp.fontFamily

})


colorProp.addEventListener("change", (e) => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.color = e.target.value;
    cell.style.color = cellProp.color
    colorProp.value = cellProp.color

})

bgColorProp.addEventListener("change", (e) => {
    let [cell, cellProp] = activeCell(currentAddress.value)

    cellProp.bgColor = e.target.value;
    cell.style.backgroundColor = cellProp.bgColor
    bgColorProp.value = cellProp.bgColor

})


alignmentProps.forEach((f) => {
    f.addEventListener("click", (e) => {
        let [cell, cellProp] = activeCell(currentAddress.value)
        const alignValue = e.target.classList[2]

        cellProp.alignment = alignValue
        cell.style.textAlign = cellProp.alignment
        switch (cellProp.alignment) {
            case 'left':
                leftAlignProp.style.backgroundColor = activeColorProp;
                rightAlignProps.style.backgroundColor = inactiveColorProp;
                centerAlignProps.style.backgroundColor = inactiveColorProp;
                break;

            case 'right':
                rightAlignProps.style.backgroundColor = activeColorProp;
                leftAlignProp.style.backgroundColor = inactiveColorProp;
                centerAlignProps.style.backgroundColor = inactiveColorProp;
                break;

            case 'center':
                centerAlignProps.style.backgroundColor = activeColorProp;
                rightAlignProps.style.backgroundColor = inactiveColorProp;
                leftAlignProp.style.backgroundColor = inactiveColorProp;
                break;
        }


    })
})

let formulaBar = document.querySelector(".formula-bar");
function updateCellProperties(cell) {

    cell.addEventListener('click', () => {

        let [rowValue,colValue ] = getValues(currentAddress.value)
        let cellProp = sheetDB[[rowValue, colValue]]

        //apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
        cell.style.fontStyle = cellProp.italic ? "italic" : ""
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily
        cell.style.color = cellProp.color
        cell.style.backgroundColor = cellProp.bgColor === "#ffffff" ? 'transparent' : cellProp.bgColor
        cell.style.textAlign = cellProp.alignment



        //apply UI properties to container props
        boldProp.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italicProp.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underlineProp.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        colorProp.value = cellProp.color
        bgColorProp.value = cellProp.bgColor
        switch (cellProp.alignment) {
            case 'left':
                leftAlignProp.style.backgroundColor = activeColorProp;
                rightAlignProps.style.backgroundColor = inactiveColorProp;
                centerAlignProps.style.backgroundColor = inactiveColorProp;
                break;

            case 'right':
                rightAlignProps.style.backgroundColor = activeColorProp;
                leftAlignProp.style.backgroundColor = inactiveColorProp;
                centerAlignProps.style.backgroundColor = inactiveColorProp;
                break;

            case 'center':
                centerAlignProps.style.backgroundColor = activeColorProp;
                rightAlignProps.style.backgroundColor = inactiveColorProp;
                leftAlignProp.style.backgroundColor = inactiveColorProp;
                break;
        }

     
      
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;

        console.log("cellProp",cellProp)

    })
}

let allCells = document.querySelectorAll(".cell");
for (let i = 0; i < allCells.length; i++) {
    updateCellProperties(allCells[i])
}








