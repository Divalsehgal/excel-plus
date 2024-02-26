document.addEventListener("DOMContentLoaded", async function () {

    //Global variable declarations

    let fontOptions = ["Monospace", "Sans-serif", "Cursive", "Aerial"];
    let fonts = ["14", "15", "16", "17", "18"];
    let selectedFontFamily = document.querySelector(".font-family-prop");
    let selectedFont = document.querySelector(".font-size-prop");
    let addressBarInput = document.querySelector("input.address-bar");
    let loaded = false;
    let rows = 100;
    let cols = 26;

    const addressColCont = document.querySelector(".address-col-container")
    const addressRowCont = document.querySelector(".address-row-container")
    const cells = document.querySelector(".cells-container")


    // left side columns [1-100]
    for (let i = 0; i < rows; i++) {
        let addressCol = document.createElement("div")
        addressCol.innerText = i + 1;
        addressCol.setAttribute("class", "address-col")
        addressColCont.appendChild(addressCol)
    }

    // top header row [A-Z]
    for (let i = 0; i < cols; i++) {
        let addressRow = document.createElement("div")
        addressRow.innerText = String.fromCharCode(65 + i);
        addressRow.setAttribute("class", "address-row")
        addressRowCont.appendChild(addressRow)
    }

    //function : selecting address
    function markAddress(cell, i, j) {
        cell.addEventListener("click", () => {
            addressBarInput.value = `${String.fromCharCode(65 + j)}${i}`
        })
    }

    // mapping grid cells
    for (let i = 0; i < rows; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "cells-row")
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "cell");
            cell.setAttribute("contenteditable", "true");

            // selecting address of cell
            markAddress(cell, i, j);

            row.appendChild(cell);



        }
        cells.appendChild(row)
    }

    // loading font family
    async function loadFontsFamily(delay = 1000) {
        return new Promise((resolve, reject) => {
            // Loader on
            let loaderLabel = document.createElement("option");
            loaderLabel.classList.add("load");
            loaderLabel.textContent = "Loading...";
            selectedFontFamily.appendChild(loaderLabel);

            setTimeout(function () {
                for (let i of fontOptions) {
                    const option = document.createElement("option");
                    option.textContent = i;
                    option.setAttribute("value", i);
                    selectedFontFamily.appendChild(option);
                }
                // Loader off
                selectedFontFamily.removeChild(loaderLabel);
                resolve(true);
            }, delay);
        });
    }
    //loading font size
    async function loadFontSize(delay = 1000) {
        return new Promise((resolve, reject) => {
            // loader on
            let loaderLabel = document.createElement("option");
            loaderLabel.classList.add("load");
            loaderLabel.textContent = "Loading...";
            selectedFont.appendChild(loaderLabel);


            setTimeout(() => {

                for (let i of fonts) {
                    const option = document.createElement("option");
                    option.textContent = i;
                    option.setAttribute("value", i);
                    selectedFont.appendChild(option);
                }
                selectedFont.removeChild(loaderLabel);

                resolve(true)

            }, delay)
        });

    }

    //calling font functions
    if (!loaded) {
        try {
            Promise.all([loadFontsFamily(2000), loadFontSize(2000)]).then(() => {
                loaded = true;
                const loaderChildFont = document.querySelector(".font-family-prop option.load");
                const loaderChildSize = document.querySelector(".font-size-prop option.load");
                selectedFontFamily.removeChild(loaderChildFont);
                selectedFont.removeChild(loaderChildSize);
            });
        } catch (error) {
            console.error('Error loading fonts:', error);
        }
    }

    // cell props function





});





