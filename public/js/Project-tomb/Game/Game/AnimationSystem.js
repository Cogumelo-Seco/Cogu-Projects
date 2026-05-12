export default async function AnimationSystem(Game) {
    for (let i in Game.animations) {
        let animation = Game.animations[i]

        if (animation.dalay <= +new Date() && !animation.paused) {
            animation.frame += animation.boomerang ? animation.boomerangForward ? 1 : -1 : 1
            if (animation.frame > animation.endFrame) {
                if (!animation.boomerang) animation.frame = animation.loop ? animation.startFrame : animation.endFrame
                else animation.boomerangForward = animation.boomerangForward ? false : true
            } else if (animation.frame < animation.startFrame) {
                animation.boomerangForward = animation.boomerangForward ? false : true
                animation.frame = animation.startFrame
            }
            animation.dalay = +new Date()+animation.totalDalay
        }
    }

    setTimeout(() => AnimationSystem(Game), 1000/30)
}