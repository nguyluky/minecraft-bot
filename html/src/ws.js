var fun_id = {}
var id = 0
var ws

function sendAip(data, keepConnect, callback) {
    id++
    ws.send(JSON.stringify({data: data, id: id, keepConnect: keepConnect}))
    if (callback) {
        fun_id[id] = callback
    }
}

function connet(callback) {
    ws = new WebSocket(`ws${location.protocol.replace('http', '')}/${location.host}`)
    ws.onopen = () => {
        console.log('conneted')
    }
    ws.onclose = () => {
        console.log('lost connet...')
        setTimeout(() => {
            connet()
        }, 5000)
    }
    ws.onmessage = (message) => {
        var message = JSON.parse(message.data)
        const {data, id, keepConnect} = message
        const fun = fun_id[id]
        if (fun) fun(data)
        if (!keepConnect) delete fun_id[id];
    }
}

function follow(name , callback) {
    apiSend({
        type: "follow",
        bot_name: name
    },false ,callback)
}

function init(callback) {
    sendAip({type: "init"}, false,callback)
}

function craftBot(name, host, port,callback) {
    sendAip(
        {
            type: "craftBot", 
            name: name,
            host: host,
            port: port,
        }, true, callback)
}

connet()