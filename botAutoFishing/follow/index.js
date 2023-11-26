/**
 * 
 * @param {mineflayer.Bot} bot 
 */
function inject(bot) {
    bot.follow = {
        /**
         * 
         * @param {Entity} player 
         * @param {Number} range
         */
        followPlayer: (player, range) => {
            bot.emit('followStared')
            const goal = new goals.GoalFollow(player, range)
            bot.pathfinder.setGoal(goal)
        },
        cancel: () => {
            bot.emit('followStoped')
            bot.pathfinder.stop()
        }
    }
}

module.exports = inject;