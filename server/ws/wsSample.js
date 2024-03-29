

/**
 * 
 * @param {WebSocket} ws 
 * @param {import("express").Request} req 
 */
module.exports = function(ws, req) {
    ws._socket.setKeepAlive(true);
    const send = msg=>ws.send(JSON.stringify(msg));//helpfull alias

    ws.on('message', function(_msgblob) {
        try{
            const msg = JSON.parse(_msgblob);
            send(msg);//for example we returns what requested
        } catch(e) {
            send({error:e});
        }
    });
    ws.on('close', function() {
        //?
    });
}