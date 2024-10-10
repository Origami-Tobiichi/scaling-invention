const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fetch = require('node-fetch'); // Pastikan Anda menginstal node-fetch

const app = new Koa();
const router = new Router();

app.use(bodyParser());

function connect(PORT) {
  router.post('/', (ctx) => {
    ctx.body = 'Halo Lort';
  });

  router.post('/nowa', async (ctx) => {
    let q = ctx.request.query.number;
    const regex = /x/g;
    if (!q) return ctx.body = 'Input Parameter Number Parameter';
    if (!q.match(regex)) return ctx.body = 'Parameter Number Must Fill With One Letter "x"';
    
    let random = q.match(regex).length;
    let total = Math.pow(10, random);
    let array = [];
    
    for (let i = 0; i < total; i++) {
      let list = [...i.toString().padStart(random, '0')];
      let result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';
      
      // Asumsikan conn sudah didefinisikan sebelumnya
      if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) {
        let info = await conn.fetchStatus(result).catch(_ => {});
        array.push({ jid: result, exists: true, ...info });
      } else {
        array.push({ jid: result, exists: false });
      }
    }
    
    ctx.body = { result: array };
  });

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(PORT, () => {
    keepAlive();
    console.log('App listened on port', PORT);
  });
}

function keepAlive() {
  let url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  if (/(\/\/|\.)undefined\./.test(url)) return;
  setInterval(() => {
    fetch(url).catch(console.log);
  }, 30 * 1000);
}

function formatDate(n, locale = 'id') {
  let d = new Date(n);
  return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' });
}

module.exports = connect;
