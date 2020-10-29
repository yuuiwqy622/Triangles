function selectCell(e) {
    e.preventDefault()

    let l = e.target.classList
    if (l.contains('selected')) {
        l.remove('selected')
        return
    }

    l.add('selected')
}


function setVal(e) {
    e.target.textContent = document.getElementById('val').value
    console.log(e.target)
}

document.addEventListener('DOMContentLoaded', (e) => {
    let cells = document.querySelectorAll('td')
    for (c of cells) {
        c.addEventListener('contextmenu', selectCell)
        c.addEventListener('wheel', setVal)
    }
})