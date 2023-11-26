/**
 * 
 * @param {import("mineflayer").Bot} bot 
 */
function star(bot) {
    var fishing_rod = this.bot.inventory.items().find((e) => e.name == 'fishing_rod')
    if (!fishing_rod) {
        this.wsSend('ERROR', '> FISH haven\' fishing_rod')
        return
    }

    
    
}

/**
 * 
 * @param {import("mineflayer").Bot} bot 
 */
function inject(bot) {
    bot.autofish = {
        star: () => star(bot),
        stop: () => null
    }

}

module.exports = inject