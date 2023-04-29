export default (state, handleKeys) => {
    state.buttons['DevWaterMarkButton'] = {
        minX: 932,
        maxX: 1000,
        minY: 972,
        maxY: 1000,
        pointer: true,
        over: false,
        onClick: () => {
            open('https://www.instagram.com/wellingtonfelipe_cogu/')
        }
    }
}