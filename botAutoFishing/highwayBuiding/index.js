const Vec2 = require("vec2");
const { Vec3 } = require("vec3");
const {GoalBlock} = require('mineflayer-pathfinder').goals

const blackList = [
    "air",
    "water",
    "flowing_water",
    "red_mushroom",
    "red_flower",
    "lava",
    "flowing_lava"
]

let targetL;
let isX;
/**
 * 
 * @param {import("mineflayer").Bot} bot 
 */
function checkNextPos(bot) {
    
}


function buidingTemplay(pos) {

}

/**
 * 
 * @param {import("mineflayer").Bot} bot 
 * @param {import("minecraft-data").Block} block
 */
async function breakBlock(bot, block) {
    const item = bot.pathfinder.bestHarvestTool(block);
    if (item) {
        await bot.equip(item);
    }
    await bot.dig(block);
}

/**
 * 
 * @param {import("mineflayer").Bot} bot 
 * @param {Vec2} target 
 */
async function star(bot, target) {
    const mcData = require('minecraft-data')(bot.version)
    targetL = target
    var nowPos, vec, next;
    if (target.x > target.y) {
        next = () => {
            const pos = bot.entity.position;
            if (bot.entity.position.x > target.x) {
                return new Vec3(pos.x - 1, pos.y, pos.z)
            }
            else {
                return new Vec3(pos.x + 1, pos.y, pos.z)
            }
        }
    }
    else {
        next = () => {
            const pos = bot.entity.position;
            if (pos.z > target.y) {
                return new Vec3(pos.x, pos.y, pos.z - 1)
            }
            else {
                return new Vec3(pos.x, pos.y, pos.z + 1)
            }
        }
    }
    while (true) {
        nowPos = next()
        
    }
}
function inject (bot) {
    bot.highwayBuiding = {
        star: (target) => star(bot, target),
        stop: () => {return ''}
    }
}
