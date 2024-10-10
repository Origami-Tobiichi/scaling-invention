let handler = async (m, { conn, usedPrefix,setReply }) => {
  let caption = `
🚨 Silahkan Pilih Misi Kamu:

🛵 Ojek
🚀 Roket
👮 Polisi
🚶 Rob
☠️ Hitman
🚖 Taxy

Contoh:
${usedPrefix}ojek
`.trim();
  setReply(caption);
};
handler.help = ["misi", "misirpg"];
handler.tags = ["info"];
handler.command = /^(misi(rpg)?|misirpg)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;
