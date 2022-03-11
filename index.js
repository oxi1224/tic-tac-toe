
let board = document.getElementById('board');
let cells = board.querySelectorAll('div.cell');

for (let index = 0; index < cells.length; ++index){
    const cell = cells[index];
    cell.addEventListener("click", function() {
        let turn = 1;
        if (turn == 1) {
            turn = 2;
            cell.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            cell.innerHTML = '<i class="fa-solid fa-o"></i>';
            turn = 1;
        }
    })
}