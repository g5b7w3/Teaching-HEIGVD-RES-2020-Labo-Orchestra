const dgram = require("dgram");

const INTERVAL = 1000;

const PORT = 9907;

const HOSTNAME = "239.255.22.5";

const INSTRUMENTS = [
	["piano", "ti-ta-ti"],
	["trumpet", "pouet"],
	["flute", "trulu"],
	["violin", "gzi-gzi"],
	["drum", "boum-boum"],
];

const RFC4122 = require ('rfc4122');
const uuid = new RFC4122().v4f;

const socket = dgram.createSocket('upd4');
const sounds = new Map(protocol.INSTRUMENTS);

const sound = sounds.get(process.argv[2]);

setInterval(() => socket.send(JSON.stringify({uuid:uuid, sound:sound}), PORT, HOSTNAME), INTERVAL); 
