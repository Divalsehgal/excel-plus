document.addEventListener("DOMContentLoaded", async function () {
    let sheetDB = {}
    let activeColorProp = "gray";
    let inactiveColorProp = "";

    const cells = document.querySelectorAll('.cell');
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
            }
            sheetDB[[j, i]] = cellProp;
        }
    }


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
    let alignmentProps = document.querySelectorAll(".alignment")
    let leftAlignProp = alignmentProps[0]
    let centerAlignProps = alignmentProps[1]
    let rightAlignProps = alignmentProps[2]

    const currentAddress = document.querySelector(".address-bar")
    function getValues(address) {
        const str = String(address.value).split("");
        const colValue = str[0].charCodeAt() - 65;
        const rowValue = str[1] - 1;
        return [colValue, rowValue];
    }
    boldProp.addEventListener("click", () => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.bold = !cellProp.bold
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal"
        boldProp.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
    })

    italicProp.addEventListener("click", () => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.italic = !cellProp.italic;
        cell.style.fontStyle = cellProp.italic ? "italic" : ""
        italicProp.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
    })



    underlineProp.addEventListener("click", () => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.underline = !cellProp.underline;
        cell.style.textDecoration = cellProp.underline ? "underline" : "none"
        underlineProp.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
    })


    fontSizeProp.addEventListener("change", (e) => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.fontSize = e.target.value;
        cell.style.fontSize = cellProp.fontSize + "px";
        fontSizeProp.value = cellProp.fontSize

    })

    fontFamilyProp.addEventListener("change", (e) => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.fontFamily = e.target.value;
        cell.style.fontFamily = cellProp.fontFamily
        fontFamilyProp.value = cellProp.fontFamily

    })


    colorProp.addEventListener("change", (e) => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.color = e.target.value;
        cell.style.color = cellProp.color
        colorProp.value = cellProp.color

    })

    bgColorProp.addEventListener("change", (e) => {
        let [colValue, rowValue] = getValues(currentAddress)
        let [cell, cellProp] = activeCell(colValue, rowValue)

        cellProp.bgColor = e.target.value;
        cell.style.backgroundColor = cellProp.bgColor
        bgColorProp.value = cellProp.bgColor

    })


    alignmentProps.forEach((f) => {
        f.addEventListener("click", (e) => {
            let [colValue, rowValue] = getValues(currentAddress)
            let [cell, cellProp] = activeCell(colValue, rowValue)
            const alignValue = e.target.classList[2]
            console.log(alignValue)

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

    function updateCellProperties(cell) {

        cell.addEventListener('click', () => {

            let [colValue, rowValue] = getValues(currentAddress)
            const cellProp = sheetDB[[colValue, rowValue]]

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


        })
            ;
    }

    for (let i = 0; i < cells.length; i++) {
        updateCellProperties(cells[i])

    }



})


