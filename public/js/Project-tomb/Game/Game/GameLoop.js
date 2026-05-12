export default async function GameLoop(Game) {

    window.requestAnimationFrame(() => GameLoop(Game))
}