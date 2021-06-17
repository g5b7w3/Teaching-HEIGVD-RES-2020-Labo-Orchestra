const protocol = require("./protocol.js");
const dgram = require("dgram");
const interval = 1000;
const RFC4122 = require('rfc4122');
const uuid = new RFC4122().v4f();
const socket = dgram.createSocket('udp4');
const sounds = new Map(protocol.INSTRUMENTS);
const sound = sounds.get(process.argv[2]);

setInterval(() => socket.send(JSON.stringify({uuid:uuid, sound:sound}), protocol.PORT, protocol.HOSTNAME), interval);
