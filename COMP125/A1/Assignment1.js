function generateTable() {
    const rows = document.getElementById('numRow').value;
    const column = document.getElementById('numColumn').value;
    const tableContainer = document.getElementById('tableContainer');

    if (rows < 1 || column < 1) {
        alert("Error: Enter a minimum of 1 for the rows and columns");
        return;
    }

    let table = '<table>';
    let i = 1;
    while (i <= rows) {
        table += '<tr>';
        let j = 1;
        while (j <= column) {
            table += '<td>' + (i * j) + '</td>';
            j++;
        }
        table += '</tr>';
        i++;
    }
    table += '</table>';

    tableContainer.innerHTML = table;
}