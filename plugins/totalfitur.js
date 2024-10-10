const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const handler = async(m, { conn, text,setReply }) => {
  // Path ke folder plugins
  const pluginsFolderPath = './plugins';

  // Daftar folder yang ingin dikecualikan dari perhitungan
  const excludedFolders = ['Bot-function', 'Game-answer', 'Game-hint', 'Case']; // Ganti dengan nama folder yang ingin dikecualikan

  // Fungsi untuk menghitung jumlah file.js dalam sebuah folder
  function countJSFiles(folderPath) {
    try {
      const files = fs.readdirSync(folderPath); // Baca isi folder secara sinkron
      let jsFileCount = 0;

      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath); // Dapatkan informasi status file

        if (stat.isDirectory()) {
          if (!excludedFolders.includes(file)) {
            jsFileCount += countJSFiles(filePath); // Rekursif untuk folder dalam folder
          }
        } else {
          if (path.extname(file) === '.js') {
            jsFileCount++; // Tambahkan 1 untuk setiap file.js
          }
        }
      });

      return jsFileCount;
    } catch (error) {
      console.error('Error:', error);
      return 0; // Jika terjadi error, kembalikan nilai 0
    }
  }

  // Hitung jumlah file.js dalam semua folder di dalam folder plugins
  const totalJSFiles = countJSFiles(pluginsFolderPath);

  const totalFitur = () => {
    try {
      const mytext = fs.readFileSync('./message/case.js', 'utf8');
      const numCases = (mytext.match(/(?<!\/\/)(case\s+['"][^'"]+['"])/g) || [])
        .length;
      return numCases;
    } catch (err) {
      console.error('Error:', err);
      return 0;
    }
  };

  const img = 'https://telegra.ph/file/59a2583b604f3cb255cb4.jpg';
 // const copyright = 'Your Copyright Here'; // Ganti dengan nilai yang sesuai
//  const calender = 'Your Calendar Here'; // Ganti dengan nilai yang sesuai

  const teks = `––––––『 *TOTAL FEATURE* 』––––––

  • Plugins : ${totalJSFiles}
  • Cases : ${totalFitur()}

  Total: ${totalFitur() + totalJSFiles} feature

  ${copyright} - ${calender}`;

  setReply(teks)

  const contextInfo = {
    externalAdReply: {
      showAdAttribution: true,
      mediaType: 1,
      title: copyright,
      mediaUrl: img,
      thumbnailUrl: img,
      sourceId: ' ',
      sourceUrl: '',
    },
  };
};

handler.help = ['totalfitur'];
handler.tags = ['info'];
handler.command = ['totalfitur', 'fitur'];
handler.customPrefix = /(?:.)/;

module.exports = handler;
