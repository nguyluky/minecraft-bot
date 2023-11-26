const express = require('express');
const http = require('http')
const path = require('path');
const WebSocket = require('ws')
const { v4: uuidv4 } = require('uuid')
var request = require('request').defaults({ encoding: null });

// const botAutoFishing = require('./botAutoFishing');

const app = express();
const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })

const memory = {
    bots: []
}

function HandlUpdate(type, name, data) {
    var wss_id = handl_command.bots_ws_follow[name]
    wss.clients.forEach(ws => {
        if (wss_id.includes(ws.id)) {
            ws.send(JSON.stringify({ type: type, 'data': data}))
        }
    })
}
function ws2bot(id) {
    let bot_res;
    Object.keys(handl_command.bots_ws_follow).forEach(e => {
        var element = handl_command.bots_ws_follow[e].find(j => j == id)
        if (element) {
            bot_res = handl_command.bots[e]
        }
    })
    return bot_res
}


wss.on('connection', function connection(ws) {
    ws.id = uuidv4()
    ws.on('message', (mes) => {
        const mess = JSON.parse(String(mes))
        const id = mess.id
        const keepConnect = mess.keepConnect;
        const data = mess.data
        console.log(mess)
    
        switch (data.type) {
            case "init":
                ws.send(JSON.stringify({id: id, keepConnect: keepConnect, data: Object.keys(memory.bots)}))
                break;
            case "craftBot":
                const {name, host, port} = data;
                console.log(name, host, port)
                break;
            
            
        }
    })

    ws.on('close', () => {
        
    })
})

app.get('/imgbase64', async (req, res) => {
    const url = req.query.url
    if (url) {

        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                res.send(data)
            }
        });

    }
    else {
        res.send('null')
    }
})

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <script> window.location = window.location.href + 'bot_contro' </script></body></html>`)
})
app.get('/img/:fileName', (req, res) => {
    var fileName = req.params.fileName
    res.sendFile(`./html/img/${fileName}`, {
        root: path.join(__dirname)
    })
})
app.get('/status', (req, res) => {
    console.log('status')
    res.send('ok')
})
app.get('/bot_contro', (req, res) => {
    res.sendFile('/html/index.html', {
        root: path.join(__dirname)
    })
})
app.get('/scr/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    res.sendFile(`/html/src/${fileName}`, {
        root: path.join(__dirname)
    })
})
server.listen(4000, () => {
    console.log('http://127.0.0.1:' + 4000)
    console.log('ok')
})