function selectTr(e) {
    e.preventDefault()
    let l = e.target.classList
    if (l.contains('selected')) {
        l.remove('selected')
        return
    }

    l.add('selected')
}

function emptyTr(e) {
    if (e.which != 1) return

    let l = e.target.classList
    if (l.contains('empty')) {
        l.remove('empty')
        return
    }

    l.add('empty')
}

document.addEventListener('DOMContentLoaded', (e) => {
    let svg = document.getElementById('trSVG')
    let trs = svg.getElementsByTagName('polygon')

    for (let t of trs) t.addEventListener('contextmenu', selectTr)
    for (let t of trs) t.addEventListener('mousedown', emptyTr)

})