const protocol = require("./protocol.js");
const dgram = require('dgram');
const net = require('net');
const interval = 5000;
const portTCP = 2205;
const instrument_list = new Map(Array.from(protocol.INSTRUMENTS, e => [e[1], e[0]]));
const socketUDP = dgram.createSocket('udp4');
const srv = net.createServer();

var musician_list = new Map();


function sound(message) {
    var msg = JSON.parse(message);

    var musician = musician_list.get(msg.uuid);
    var time = Date.now();

    // If musician is active
    if (musician != undefined && time - musician.last <= interval) {
        musician_list.set(msg.uuid, {instrument:musician.instrument, first:musician.first, last:time});
    } else {
        musician_list.set(msg.uuid, {instrument:instrument_list.get(msg.sound), first:time, last:time});
    }
}

function connect(socket) {
    var time = Date.now();
    var msg = JSON.stringify([...musician_list].filter(([key, value]) => {
        if (time - value.last > interval) {
            console.log("Removing lazy musician: ", key);
            musician_list.delete(key);
            return false;
        }
        
        return true;
    }).map(([key, value]) => {
        return {uuid: key, instrument: value.instrument, activeSince: new Date(value.first)};
    }));

    socket.write(msg);
    socket.write("\n");
    socket.end();
}

socketUDP.on("message", sound);

socketUDP.bind(protocol.PORT, function() {
  console.log("Joining multicast group");
  socketUDP.addMembership(protocol.HOSTNAME);
});

srv.listen(portTCP);

srv.on("connection", connect);
