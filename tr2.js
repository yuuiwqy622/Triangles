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

function createTable(lines) {
    let n = parseInt(lines[0])
    let m = 1 + 2 * (n - 1)
    let t = document.querySelector('table')

    for (let i = 0; i < n; ++i) {
        let tr = document.createElement('tr')
        for (let j = 0; j < m; ++j) {
            let td = document.createElement('td')
            td.textContent = +(lines[i + 1][j] == '-')
            td.addEventListener('contextmenu', selectCell)
            td.addEventListener('wheel', setVal)
            tr.append(td)
        }

        t.append(tr)
    }
}

function readFile(e) {
    let f = e.target.files[0]
    if (!f) return

    let rd = new FileReader()
    rd.onload = (e) => {
        let lines = e.target.result.split(/[\r\n]+/g)
        createTable(lines)
    }
    rd.readAsText(f)
}

function maxArea() {
    let rows = document.querySelector('table').children
    let n = rows.length
    let m = rows[0].children.length
    let area = 0

    /* downwards triangles */
    for (let i = 1; i < n; ++i)
        for (let j = i; j < m - i; ++j) {
            let td = rows[i].children[j]
            td.classList.add('selected')
            let s = parseInt(td.textContent)

            if (s) {
                let sub1 = rows[i - 1].children[j - 1]
                let sub2 = rows[i - 1].children[j]
                let sub3 = rows[i - 1].children[j + 1]
                sub1.classList.add('sub')
                sub2.classList.add('sub')
                sub3.classList.add('sub')

                let a = parseInt(sub1.textContent)
                let b = parseInt(sub2.textContent)
                let c = parseInt(sub3.textContent)
                s = Math.min(a, b, c) + 1
                td.textContent = s

                sub1.classList.remove('sub')
                sub2.classList.remove('sub')
                sub3.classList.remove('sub')
            }

            area = Math.max(area, s)
            td.classList.remove('selected')
        }

    /* upwards triangles */
    for (let j = n - 2; j < m - n + 2; ++j) {
        let td = rows[n - 2].children[j]
        let v = parseInt(td.textContent)
        v = v > 0 | 0
        td.textContent = v
    }

    for (let i = n - 3; i >= 0; --i)
        for (let j = i + 2; j < (n + n - i - 3); ++j) {
            let td = rows[i].children[j]
            td.classList.add('selected')
            let s = parseInt(td.textContent)

            if (s) {
                let sub1 = rows[i + 1].children[j - 1]
                let sub2 = rows[i + 1].children[j]
                let sub3 = rows[i + 1].children[j + 1]
                sub1.classList.add('sub')
                sub2.classList.add('sub')
                sub3.classList.add('sub')

                let a = parseInt(sub1.textContent)
                let b = parseInt(sub2.textContent)
                let c = parseInt(sub3.textContent)
                s = Math.min(a, b, c) + 1
                td.textContent = s

                sub1.classList.remove('sub')
                sub2.classList.remove('sub')
                sub3.classList.remove('sub')
            }

            area = Math.max(area, s)
            td.classList.remove('selected')
        }


    alert(`Max area is ${area * area}`)
}

document.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('file-input').addEventListener('change', readFile)
    document.getElementById('start').addEventListener('click', maxArea)
})