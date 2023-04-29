export default async (index) => {
    let table = document.getElementById('minesweeperTable')
    
    if (index.state.mapInfo.reload) {
        table.innerHTML = ''
        for (let row in index.state.mapInfo.data) {
            let rowElement = document.createElement('tr')

            for (let column in index.state.mapInfo.data[row]) {
                row = Number(row)
                column = Number(column)
                let columnElement = document.createElement('th')
                columnElement.className = index.state.mapInfo.data[row][column].clicked ? 'clicked' : 'notclicked'
                columnElement.style.color = 'transparent'
                columnElement.innerText = '0'

                index.state.mapInfo.data[row][column].number = 10
                if (!index.state.mapInfo.data[row][column].clicked && index.state.mapInfo.data[row][column].flag) columnElement.style.backgroundImage = 'url(/imgs/Minesweeper/Flag.png)'
                else if (index.state.mapInfo.data[row][column].id != 1) {
                    let columnNumber = 0
                    if (index.state.mapInfo.data[row-1] && index.state.mapInfo.data[row-1][column-1] && index.state.mapInfo.data[row-1][column-1].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row-1] && index.state.mapInfo.data[row-1][column] && index.state.mapInfo.data[row-1][column].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row-1] && index.state.mapInfo.data[row-1][column+1] && index.state.mapInfo.data[row-1][column+1].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row+1] && index.state.mapInfo.data[row+1][column-1] && index.state.mapInfo.data[row+1][column-1].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row+1] && index.state.mapInfo.data[row+1][column] && index.state.mapInfo.data[row+1][column].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row+1] && index.state.mapInfo.data[row+1][column+1] && index.state.mapInfo.data[row+1][column+1].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row][column-1] && index.state.mapInfo.data[row][column-1].id == 1) columnNumber += 1
                    if (index.state.mapInfo.data[row][column+1] && index.state.mapInfo.data[row][column+1].id == 1) columnNumber += 1
                    
                    if (index.state.mapInfo.data[row][column].clicked) {
                        columnElement.style.color = getNumberColor(columnNumber)
                        columnElement.innerText = columnNumber
                    }
                    index.state.mapInfo.data[row][column].number = columnNumber
                } else if (index.state.mapInfo.data[row][column].clicked) columnElement.style.backgroundImage = 'url(/imgs/Minesweeper/Bomb.png)'

                columnElement.onclick = (event) => require('../Functions/tileClicked').default(index.state, { row, column, event, leftButton: true })
                columnElement.oncontextmenu = (event) => {
                    event.preventDefault()
                    require('../Functions/tileClicked').default(index.state, { row, column, event, leftButton: false })
                }

                rowElement.appendChild(columnElement)
            }

            table.appendChild(rowElement)
        }
        index.state.mapInfo.reload = false
    }

    function getNumberColor(id) {
        switch(id) {
            case 0:
                return 'transparent'
            case 1:
                return '#0100fa'
            case 2:
                return '#017f01'
            case 3:
                return '#fd0100'
            case 4:
                return '#01007f'
            case 5:
                return '#850005'
            case 6:
                return '#00847d'
            case 7:
                return '#000000'
            case 8:
                return '#808080'
        }
    }
    //column
}