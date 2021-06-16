const dgram = require("dgram");

const dgram = require('dgram');

const net = require ('net');

const INTERVAL = 5000;

const TCP_PORT = 2205;

const INSTRUMENTS = [
	["piano", "ti-ta-ti"],
	["trumpet", "pouet"],
	["flute", "trulu"],
	["violin", "gzi-gzi"],
	["drum", "boum-boum"],
];

const instruments = new Map(Array.from(INSTRUMENTS, e => [e[1], e[0]));


const socketUDP = dgram.createSocket('udp4');

const srv = net.createServer();

var musicians = new map();

function sound(message, unused){
	var msg = JSON.parse(message);

	var musician = musicians.get(msg.uuid);

	var time = Date.now();

	if(musician != undefined && time - musician.last <= INTERVAL){
		musicians.set(msg.uuid, {instrument:musician.instrument, first:musician.first, last:time});
	}
	else{
		musicians.set(msg.uuid, {instrument:instruments.get(msg.sound), first:time, last:time});
	}
}


function connect(socket){
	var time = Date.now();
	var msg = JSON.stringify([...musicians].filter(([key, value]) => {
		if(time - value.last > INTERVAL){
			console.log("Remove lazy musicians", key);
			musicians.delete(key);
			return false;
		}

		return true;
	}).map(([key,value]) => {
		return {uuid: key, instrument: value.instrument, activeSince: new Date(value.first)};
	}));

	socket.write(msg);
	socket.write("\n");
	socket.end();
}
socketUDP.on("message", receiveSound);
socketUDP.bind(protocol.PORT, function(){
	console.log("Join multicast group");
	socketUDP.addMembership(protocol.HOSTNAME);
});
server.listen(TCP_PORT);
server.on("connection", connect);
