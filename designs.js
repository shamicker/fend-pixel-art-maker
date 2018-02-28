// my global variables
const picker = document.getElementById("colorPicker");
const canvas = document.getElementById("pixelCanvas");
let colour = picker.value;

// Select color input
picker.addEventListener("input", function(){
    colour = picker.value;
    console.log("colour is",colour);
});


// Select size input
function getGridSize(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    const height = document.getElementById("inputHeight").value;
    const width = document.getElementById("inputWeight").value;

    makeGrid(height, width);
};

function popUp(event, choice){
    if (confirm( `Did you mean to choose the ${choice}?` )){
        event.target.style.backgroundColor = colour;
    }
};

// When size is submitted by the user, call makeGrid()
function makeGrid(height, width) {
    // clear the canvas!!
    canvas.innerHTML = "";

    // make elements
    const tbody = document.createElement("tbody");
    const para = document.createElement('p');
    let columns = document.createElement("colgroup");

    // add colgroups to columns
    for (let i = 0; i < width; i++){
        columns.appendChild( document.createElement("col") );
    }

    // for each row, make a row...
    for (let ri = 0; ri < height; ri++ ){
        let row = document.createElement("tr");
        // append cells to the row
        for (let cin=0; cin < width; cin++ ){
            row.appendChild( document.createElement("td") );
        }
        // ...and append each row to the tbody
        tbody.appendChild(row)
    }

    // append tbody to canvas!
    canvas.appendChild(columns);
    canvas.appendChild(tbody);
    document.body.insertBefore(para, canvas);

    console.log(canvas);

    // listen for a click on the grid
    tbody.addEventListener("click", function(evt){
        evt.preventDefault();

        let choice;
        console.log(evt);
        console.log("row ", evt.target.parentNode.rowIndex);
        console.log("column ", evt.target.cellIndex);

        // if cell is clicked
        if ( evt.target.tagName === "TD" ){
            event.target.style.backgroundColor = colour;
        }
        // if what is clicked is ambiguous
        else {
            if ( evt.target.tagName === "TR" ) {
                choice = "row";
            }
            else if ( evt.target.tagName === "COL" ){
                choice = "column";
            }
            else if ( evt.target.tagName === "TBODY" ){
                choice = "rest of the grid";
            }
            // then confirm what was clicked
            popUp(evt, choice);
        }
    }, false);
};
