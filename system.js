const cluster = require('cluster');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

const ports = [4000];
let availablePortIndex = 0;

async function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      server.close();
      resolve(true);
    });
    server.on('error', reject);
  });
}

async function startServer() {
  const port = ports[availablePortIndex];
  const isPortAvailable = await checkPort(port);

  if (isPortAvailable) {
    console.log('\x1b[33m%s\x1b[0m', `🌐 Port ${port} is open`);

    // Define the root endpoint
    router.get('/', (ctx) => {
      ctx.set('Content-Type', 'application/json');
      const data = {
        status: 'true',
        message: 'Bot Successfully Activated!',
        author: 'TAKAMIYA RYUZAKI',
      };
      const result = {
        response: data,
      };
      ctx.body = JSON.stringify(result, null, 2);
    });

    // Use the router
    app.use(router.routes()).use(router.allowedMethods());

    // Start the Koa server
    app.listen(port, () => {
      console.log(`Koa server is running at http://localhost:${port}`);
    });
  } else {
    console.log(`Port ${port} is already in use. Trying another port...`);
    availablePortIndex++;

    if (availablePortIndex >= ports.length) {
      console.log('No more available ports. Exiting...');
      process.exit(1);
    } else {
      ports[availablePortIndex] = parseInt(port) + 1;
      startServer();
    }
  }
}

startServer();

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });

  p.on('message', (data) => {
    console.log('\x1b[36m%s\x1b[0m', `🟢 RECEIVED ${data}`);
    switch (data) {
      case 'reset':
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (code) => {
    isRunning = false;
    console.error('\x1b[31m%s\x1b[0m', `Exited with code: ${code}`);
    start('index.js');

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      console.error('\x1b[31m%s\x1b[0m', `File ${args[0]} has been modified. Script will restart...`);
      start('index.js');
    });
  });

  p.on('error', (err) => {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`);
    p.kill();
    isRunning = false;
    console.error('\x1b[31m%s\x1b[0m', `Error occurred. Script will restart...`);
    start('index.js');
  });

  const pluginsFolder = path.join(__dirname, 'plugins');

  fs.readdir(pluginsFolder, (err, files) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error reading plugins folder: ${err}`);
      return;
    }
    console.log('\x1b[33m%s\x1b[0m', `🟡 Found ${files.length} plugins in folder ${pluginsFolder}`);
    try {
      require.resolve('@whiskeysockets/baileys');
      console.log('\x1b[33m%s\x1b[0m', `🟡 Baileys library version ${require('@whiskeysockets/baileys/package.json').version} is installed`);
    } catch (e) {
      console.error('\x1b[31m%s\x1b[0m', `❌ Baileys library is not installed`);
    }
  });

  console.log(`🖥️ \x1b[33m${os.type()}\x1b[0m, \x1b[33m${os.release()}\x1b[0m - \x1b[33m${os.arch()}\x1b[0m`);
  const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
  console.log(`💾 \x1b[33mTotal RAM: ${ramInGB.toFixed(2)} GB\x1b[0m`);
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
  console.log(`💽 \x1b[33mFree RAM: ${freeRamInGB.toFixed(2)} GB\x1b[0m`);
  console.log('\x1b[33m%s\x1b[0m', `📃 TAKAMIYA RYUZAKI`);

  setInterval(() => {}, 1000);
}

start('index.js');

const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
  console.log('\x1b[33m%s\x1b[0m', `📁 Created directory ${tmpDir}`);
}

process.on('unhandledRejection', (reason) => {
  console.error('\x1b[31m%s\x1b[0m', `Unhandled promise rejection: ${reason}`);
  console.error('\x1b[31m%s\x1b[0m', 'Unhandled promise rejection. Script will restart...');
  start('index.js');
});

process.on('exit', (code) => {
  console.error(`Exited with code: ${code}`);
  console.error('Script will restart...');
  start('index.js');
});
