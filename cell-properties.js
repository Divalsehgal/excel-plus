document.addEventListener("DOMContentLoaded", async function () {
    let sheetDB = {}


    const totalRows = document.querySelectorAll(".address-row-container .address-row");

    const totalColumns = document.querySelectorAll(".address-col-container .address-col");

    for (let i = 0; i < totalRows.length; i++) {
        let sheetRow = []
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



            }
            sheetDB[[j, i]] = cellProp;
        }
    }
    console.log(totalRows.length, totalColumns.length, sheetDB)


    function activeCell(c, r) {
        const cell = document.querySelector(`.cell[rid='${r}'][cid='${c}']`);
        const cellProp = sheetDB[[c, r]]

        return [cell, cellProp]


    }

    let boldProp = document.querySelector(".bold");

    let italicProp = document.querySelector(".italic")

    let underlineProp = document.querySelector(".underline")

    let colorProp = document.querySelector(".input-color-text ")
    let bgColorProp = document.querySelector(".input-color-fill")
    let fontSizeProp = document.querySelector(".font-size-prop")
    let fontFamilyProp = document.querySelector(".font-family-prop")
    let alignmentProps = document.querySelector(".alignment")
    let leftAlignProp = alignmentProps[0]
    let centerAlignProps = alignmentProps[1]
    let rightAlignProps = alignmentProps[2]

    const currentAddress = document.querySelector(".address-bar")
    boldProp.addEventListener("click", () => {
        let str = String(currentAddress.value).split("");
        let colValue = str[0].charCodeAt() - 65;
        let rowValue = str[1] - 1;
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.bold = !cellProp.bold
        cell.style.fontWeight === "bold" ? cell.style.fontWeight = "" : cell.style.fontWeight = "bold"
        console.log(cellProp)
    })

})


