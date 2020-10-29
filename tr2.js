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

function readFile(e) {
    let f = e.target.files[0]
    if (!f) return

    let rd = new FileReader()
    rd.onload = (e) => {
        let content = e.target.result
        console.log(content)
    }
    rd.readAsText(f)
}

document.addEventListener('DOMContentLoaded', (e) => {
    let cells = document.querySelectorAll('td')
    for (c of cells) {
        c.addEventListener('contextmenu', selectCell)
        c.addEventListener('wheel', setVal)
    }
    document.getElementById('file-input').addEventListener('change', readFile)
})