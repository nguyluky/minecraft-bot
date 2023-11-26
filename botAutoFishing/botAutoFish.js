const mineflayer = require('mineflayer')
const antiafk = require("mineflayer-antiafk");
const {Entity} = require("prismarine-entity")
const Vec3 = require('vec3').Vec3

const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const goals = require('mineflayer-pathfinder').goals

const follow = require('./follow')

class highway {
    constructor(vec1, vec2) {
        this.pos = vec1
        this.target = vec2

        this.offset = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [-1, 0, 0],
            [0, -1, 0],
            [0, 0, -1]
        ]
    }

    next() {
        var distances = []
        this.offset.forEach(e => {
            var d = Math.round(this.target.distanceTo(this.pos.offset(e[0], e[1], e[2])).toFixed(2) * 100)
            distances.push(d)
        })
        var min = Math.min(...distances)
        var index = distances.indexOf(min)

        if (this.pos.x == this.target.x && this.pos.y == this.target.y && this.pos.z == this.target.z) return false
        this.pos = this.pos.offset(this.offset[index][0], this.offset[index][1], this.offset[index][2])

        return this.pos
    }
}



/**
 * 
 * @param {mineflayer.Bot} bot 
 */
function highwayBuiding(bot) {

    function checkNextBlock() {

    }
    bot.highwayBuiding = {
        /**
         * 
         * @param {Vec3} target 
         */
        buidingTo: (target) => {

        }
    }
}


class botAutoFishing {
    constructor(playerName, host, port) {
        this.playerName = playerName
        this.host = host == '' ? 'localhost' : host
        this.port = port == '' ? 1111 : port
        this.isRun = false

        console.log(`connet to ${host}:${port} at player name ${playerName}`)

        //type: DEBUG, EVENT, INFOR, SUCCESS, ERROR
        this.Update = (type, name, data) => {}
        this.wsSend = (type, data) => {
            this.Update(type, this.playerName, data)
        }
        this.initBot();
    }

    //________________________________________________________________
    initBot() {
        this.bot = mineflayer.createBot({
            host: this.host,
            port: this.port,
            username: this.playerName
        })
        this.bot.loadPlugin(pathfinder)
        this.bot.loadPlugin(antiafk);
        this.bot.loadPlugin(follow)
        this.initEvent()
    }
    initEvent() {
        this.bot.once('login' , () => {
            this.isRun = true
        })

        this.bot.on('whisper', (username, message, translate, jsonMsg, matches) => {
            if (username == this.playerName) return

            console.log("🚀 ~ file: botAutoFishing.js:78 ~ botAutoFishing ~ this.bot.on ~ message:", message)
        })
    }
    //________________________________________________________________
    activateFishing() {
        var getId = (e) => {
            if (e.name == "fishing_bobber") {
                this.autofishData.fishingBobberId = e.id
                this.bot.removeListener('entitySpawn', getId)
            }
        }

        var waterBlocks = this.bot.findBlocks({
            matching: this.mcData.blocksByName.water.id,
            count: 20,
            maxDistance: 3
        })

        var water = waterBlocks.find((e) => {
            return e.y == this.bot.entity.position.y - 1
        })
        if (water) {
            var p = water.offset(0.5, 0.5, 0.5)
            this.bot.addListener('entitySpawn', getId)
            this.bot.lookAt(p, true).then(() => {
                setTimeout(() => {
                    this.bot.activateItem()
                }, 100)
            })
        }
        else {
            this.wsSend('ERROR', '> FISH no water')
        }
    }

    wsSendDEBUG() {
        this.wsSend('EVENT', JSON.stringify({
            type: 'spawn',
            data: true
        }))
        this.wsSend('EVENT', JSON.stringify({
            type: 'health',
            data: {
                hp: this.bot.health,
                food: this.bot.food
            }
        }))
        this.wsSend('EVENT', JSON.stringify({
            type: 'updateSlot',
            data: this.bot.inventory.items()
        }))
        const pos = this.bot.entity.position
        this.wsSend('EVENT', JSON.stringify({
            type: 'move',
            data: {
                x: pos.x,
                y: pos.y,
                z: pos.z
            }
        }))
        this.wsSend('INFOR', JSON.stringify({
            botName: this.playerName,
            iP: this.host,
            Port: this.port
        }))
        this.wsSend('EVENT', JSON.stringify({
            type: 'bot_run',
            data: this.isrun
        }))
    }
}
var bot = new botAutoFishing('fish2', '', '')
// module.exports = botAutoFishing;