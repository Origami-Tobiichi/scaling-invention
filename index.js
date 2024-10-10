//import settings from './settings.mjs'; 
require('./settings')
const { modul } = require('./module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, url, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
	default: FernazerBotIncConnect,
	BufferJSON,
	PHONENUMBER_MCC,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    proto
} = require("@whiskeysockets/baileys")
const cfonts = require('cfonts');
const { color, bgcolor } = require('./lib/color')
const { TelegraPh } = require('./lib/uploader')
const NodeCache = require("node-cache")
const { tmpdir } = require('os')
const { parsePhoneNumber } = require("libphonenumber-js")
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
const makeWASocket = require("@whiskeysockets/baileys").default
const {
  statSync,
  unlinkSync,
  watch
} = require('fs')
const Pino = require("pino")
const connect = require("./server.js");
const PORT = process.env.PORT || 0xbb8;
const {
  createRequire
} = require("module");
const requireFromFile = createRequire(__filename);
global.__filename = function filename(_0x273cee = __filename, _0x1529fa = process.platform !== "win32") {
  return _0x1529fa ? /file:\/\/\//.test(_0x273cee) ? url.fileURLToPath(_0x273cee) : _0x273cee : url.pathToFileURL(_0x273cee).toString();
};
global.__require = function require(_0x21a2f8 = __filename) {
  return createRequire(_0x21a2f8);
};
const {
  readdirSync,
  readFileSync,
  existsSync
} = fs;
const {
  join,
  dirname
} = require("path")
const readline = require("readline")
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const prefix = ''
let phoneNumber = "6288221051232"
global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
dashboard: [],
listerror: [],
blockcmd: [],
settings: {},
...(global.db || {})
}
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")

const useMobile = process.argv.includes("--mobile")
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const question = (text) => new Promise((resolve) => rl.question(text, resolve))
require('./FliXBOT.js')
nocache('../FliXBOT.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

async function Fernazer2() {
	const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
	const msgRetryCounterCache = new NodeCache()
    	const Fernazer = FernazerBotIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Mac OS', 'Chrome', '118.0.5993.90'], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
      getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: " Bot Here!"
            }
        },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })

    store.bind(Fernazer.ev)

if (pairingCode && !Fernazer.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +6281328139682")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Silakan Masukan Nomer WhatsApp Bot nya 🐦\nFor example: +6281328139682 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +6281328139682")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number 😍\nFor example: +6281328139682 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await Fernazer.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Kode Pairing Anda : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
   
   const { tmpdir } = require('os');
const { join } = require('path');
const { readdirSync, statSync, unlinkSync, existsSync, mkdirSync } = require('fs');

async function clearTmp() {
  const tmpDirs = [tmpdir(), join(__dirname, './tmp')];
  const filenames = [];

  tmpDirs.forEach(dirname => {
    // Check if the directory exists before reading
    if (existsSync(dirname)) {
      // Read the directory contents and push file paths to filenames
      readdirSync(dirname).forEach(file => filenames.push(join(dirname, file)));
    } else {
      // If the directory does not exist, create it
      console.log(`Directory does not exist, creating: ${dirname}`);
      mkdirSync(dirname, { recursive: true });
    }
  });

  // Filter and delete files older than 3 minutes
  filenames.forEach(file => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) {
      unlinkSync(file); // Delete the file
      console.log(`Deleted file: ${file}`);
    }
  });

  return filenames;
}
setInterval(async () => {
	var a = await clearTmp()
	console.log(chalk.cyanBright('Successfully restart panel'))
}, 10000)

Fernazer.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				Fernazer2()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				Fernazer2();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				Fernazer2();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				Fernazer2()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				Fernazer2();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				Fernazer2();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				Fernazer2();
			} else Fernazer.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n👀Menghubungkan...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			await delay(199)
cfonts.say('Fernazer', {
    font: 'block',
    align: 'left',
    colors: ['blue', 'blueBright'],
    background: 'transparent',
    rawMode: false,
});
		}
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  Fernazer2();
	}
	
})


await delay(555) 
start('2',colors.bold.white('\n\nMenunggu Pesan Baru..'))

Fernazer.ev.on('creds.update', await saveCreds)

    // Anti Call
    Fernazer.ev.on('call', async (XeonPapa) => {
    let botNumber = await Fernazer.decodeJid(Fernazer.user.id)
    let XeonBotNum = db.settings[botNumber].anticall
    if (!XeonBotNum) return
    console.log(XeonPapa)
    for (let XeonFucks of XeonPapa) {
    if (XeonFucks.isGroup == false) {
    if (XeonFucks.status == "offer") {
    let XeonBlokMsg = await Fernazer.sendTextWithMentions(XeonFucks.from, `*${Fernazer.user.name}* can't receive ${XeonFucks.isVideo ? `video` : `voice` } call. Sorry @${XeonFucks.from.split('@')[0]} you will be blocked. If accidentally please contact the owner to be unblocked !`)
    Fernazer.sendContact(XeonFucks.from, global.owner, XeonBlokMsg)
    await sleep(800)
    await Fernazer.updateBlockStatus(XeonFucks.from, "block")
    }
    }
    }
    })

Fernazer.ev.on('messages.upsert', async chatUpdate => {
try {
const kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast')  {
await Fernazer.readMessages([kay.key]) }
if (!Fernazer.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
const m = smsg(Fernazer, kay, store)
require('./FliXBOT.js')(Fernazer, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

const _0x3a4535 = path.join(__dirname, './plugins');
  const _0x19a8fb = _0x433f13 => /\.js$/.test(_0x433f13);
  global.plugins = {};
  async function _0xea3c42() {
    for (let _0x9c7242 of readdirSync(_0x3a4535).filter(_0x19a8fb)) {
      try {
        let _0x371bc2 = path.join(_0x3a4535, _0x9c7242);
        const _0x4d5a3c = requireFromFile(_0x371bc2);
        global.plugins[_0x9c7242] = _0x4d5a3c["default"] || _0x4d5a3c;
      } catch (_0x42bef3) {
        console.error(_0x42bef3);
        delete global.plugins[_0x9c7242];
      }
    }
  }
  _0xea3c42().then(() => console.log(Object.keys(global.plugins)))["catch"](console.error);
  global.reload = async (_0x40e322, _0x51bee2) => {
    if (/\.js$/.test(_0x51bee2)) {
      let _0x34def2 = path.join(_0x3a4535, _0x51bee2);
      if (_0x51bee2 in global.plugins) {
        if (existsSync(_0x34def2)) {
          console.info("re - require plugin '" + _0x51bee2 + "'");
        } else {
          console.warn("deleted plugin '" + _0x51bee2 + "'");
          return delete global.plugins[_0x51bee2];
        }
      } else {
        console.info("requiring new plugin '" + _0x51bee2 + "'");
      }
      try {
        const _0x1996dc = requireFromFile(_0x34def2 + "?update=" + Date.now());
        global.plugins[_0x51bee2] = _0x1996dc['default'] || _0x1996dc;
      } catch (_0x57a7d2) {
        console.error("error require plugin '" + _0x51bee2 + "\n" + _0x57a7d2.message + "'");
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_0x289c9c], [_0x2faa94]) => _0x289c9c.localeCompare(_0x2faa94)));
      }
    }
  };
Object.freeze(global.reload);
  fs.watch(_0x3a4535, (_0x56a3c8, _0x51afbc) => {
    global.reload(null, _0x51afbc);
  });
  const _0x1865e4 = _0xea57a1 => {
    console.log(_0xea57a1);
  };
	// detect group update
Fernazer.ev.on('group-participants.update', async (anu) => {
if (global.wlcm)
        console.log(anu)
        try {
            let metadata = await Fernazer.groupMetadata(anu.id)
            const groupDesc = metadata.desc
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await Fernazer.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await Fernazer.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
                }
               if (anu.action == 'add') {
let ngel = fs.readFileSync('./temp/audio/welcome.mp3')
let contextInfo = {
externalAdReply: {
title: `WELCOME👋 @${num.split("@")[0]} To ${metadata.subject}`, 
body: 'Jangan Lupa Ikuti Rules Nya Ye',
//description: 'Patuhi Deskriptif Yak',
mediaType: 1,
thumbnailUrl: ppuser,
sourceUrl: "https://chat.whatsapp.com/DuolGpi5CIWDR8dYO6E1pC",
renderLargerThumbnail: true
}
}
Fernazer.sendMessage( anu.id,{contextInfo, audio: ngel,mimetype:'audio/mp4', ptt:true })
} 

else if (anu.action == 'remove') {
let ngel2 = fs.readFileSync('./temp/audio/left.mp3')
let contextInfo = {
externalAdReply: {
title: `GOD BYEE 👋 @${num.split("@")[0]},`, 
body: 'Balik Lagi Bawa Gorengan Yekk',
//description: 'Patuhi Deskriptif Yak',
mediaType: 1,
thumbnailUrl: ppuser,
sourceUrl: "https://chat.whatsapp.com/DuolGpi5CIWDR8dYO6E1pC",
renderLargerThumbnail: true
}
}

Fernazer.sendMessage( anu.id,{contextInfo, audio: ngel2,mimetype:'audio/mp4', ptt:true })
} else if (anu.action == 'promote') {
                    let a = `Ciee @${num.split("@")[0]}, Jadi Admin Nih ekhemm ${metadata.subject} 🎉`
Fernazer.sendMessage(anu.id, {
text: a, 
contextInfo: {
externalAdReply: {
title: `${botName}`,
body: `${ownerName}`,
thumbnailUrl: ppuser,
sourceUrl: "https://chat.whatsapp.com/DuolGpi5CIWDR8dYO6E1pC",
mediaType: 1,
renderLargerThumbnail: true
    }}})
} else if (anu.action == 'demote') {
let a = `Yhahahhaaaa @${num.split("@")[0]}, kena demote awokawok `
Fernazer.sendMessage(anu.id, {
text: a, 
contextInfo: {
externalAdReply: {
title: `${botName}`,
body: `${ownerName}`,
thumbnailUrl: ppuser,
sourceUrl: "https://chat.whatsapp.com/DuolGpi5CIWDR8dYO6E1pC",
mediaType: 1,
renderLargerThumbnail: true
    }}})
              }
            }
        } catch (err) {
            console.log("Eror Di Bagian Welcome Group "+err)
        }
    })

    // respon cmd pollMessage
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: " Bot Ada Di Sini"
        }
    }
    Fernazer.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                Fernazer.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

Fernazer.sendTextWithMentions = async (jid, text, quoted, options = {}) => Fernazer.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

Fernazer.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

Fernazer.ev.on('contacts.update', update => {
for (let contact of update) {
let id = Fernazer.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Fernazer.getName = (jid, withoutContact  = false) => {
id = Fernazer.decodeJid(jid)
withoutContact = Fernazer.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = Fernazer.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === Fernazer.decodeJid(Fernazer.user.id) ?
Fernazer.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

Fernazer.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

Fernazer.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await Fernazer.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Fernazer.getName(i)}\nFN:${await Fernazer.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	Fernazer.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

Fernazer.setStatus = (status) => {
Fernazer.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

Fernazer.public = true

Fernazer.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await Fernazer.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

Fernazer.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await Fernazer.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Fernazer.sendImageAsStickerAV = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImgAV(buff, options)
} else {
buffer = await imageToWebp2(buff)}
await Fernazer.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Fernazer.sendImageAsStickerAvatar = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp3(buff)}
await Fernazer.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Fernazer.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await Fernazer.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

Fernazer.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await Fernazer.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}
Fernazer.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

Fernazer.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

Fernazer.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

Fernazer.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await Fernazer.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await Fernazer.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

Fernazer.sendText = (jid, text, quoted = '', options) => Fernazer.sendMessage(jid, { text: text, ...options }, { quoted })

Fernazer.serializeM = (m) => smsg(Fernazer, m, store)

Fernazer.before = (teks) => smsg(Fernazer, m, store)

Fernazer.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
Fernazer.sendMessage(jid, buttonMessage, { quoted, ...options })
}

Fernazer.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: Fernazer.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${websitex}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return Fernazer.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

Fernazer.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
Fernazer.relayMessage(jid, template.message, { messageId: template.key.id })
}

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
    }: {})
})): '')

Fernazer.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
Fernazer.sendMessage(jid, fjejfjjjer, { quoted: m })
}

            /**
             * Send Media/File with Automatic Type Specifier
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} filename
             * @param {String} caption
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Boolean} ptt
             * @param {Object} options
             */
Fernazer.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await Fernazer.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await Fernazer.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await Fernazer.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}

//Fernazer.sendFile = async (jid, media, options = {}) => {
        //let file = await Fernazer.getFile(media)
        //let mime = file.ext, type
        //if (mime == "mp3") {
          //type = "audio"
          //options.mimetype = "audio/mpeg"
          //options.ptt = options.ptt || false
        //}
        //else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
        //else if (mime == "webp") type = "sticker"
        //else if (mime == "mp4") type = "video"
        //else type = "document"
        //return Fernazer.sendMessage(jid, { [type]: file.data, ...options }, { ...options })
      //}

Fernazer.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return Fernazer.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return Fernazer.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return Fernazer.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return Fernazer.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return Fernazer.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }
      
      /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    Fernazer.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return Fernazer.sendMessage(jid, { poll: { name, values, selectableCount }}) }

return Fernazer

}

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch'); // Pastikan Anda menginstal node-fetch

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 4000;

// Middleware untuk parsing JSON body dari permintaan POST
app.use(bodyParser());

// Endpoint untuk menerima permintaan POST di root
router.post('/', (ctx) => {
  console.log(ctx.request.body);
  ctx.body = { message: 'Data diterima melalui POST' };
});

// Endpoint untuk melakukan permintaan ke URL eksternal
router.post('/fetch-data', async (ctx) => {
  const { url } = ctx.request.body; // Ambil URL dari body permintaan

  try {
    const response = await fetch(url); // Lakukan permintaan fetch ke URL eksternal
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Ambil data dalam format JSON
    ctx.body = { data }; // Kirimkan data kembali
  } catch (error) {
    console.error('Error fetching data:', error);
    ctx.status = 500; // Set status ke 500
    ctx.body = { error: 'Terjadi kesalahan saat mengambil data' };
  }
});

// Endpoint POST lain untuk mengirim pesan
router.post('/send-message', (ctx) => {
  const { message } = ctx.request.body; 
  console.log(`Pesan diterima: ${message}`);
  ctx.body = { reply: 'Pesan berhasil diproses' };
});

// Gunakan router
app.use(router.routes()).use(router.allowedMethods());

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

Fernazer2()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
