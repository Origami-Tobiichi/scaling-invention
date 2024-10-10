const axios = require('axios');

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return m.reply(`• *Example :* .${command} https://www.youtube.com/xxxxxxx`);
  }

  await m.reply(mess.wait);

  try {
    let searchResponse = await ytdlnew(text);
    conn.sendMessage(
      m.chat,
      { video: { url: searchResponse.mp4DownloadLink }, mimetype: 'video/mp4' },
      { quoted: m }
    );
  } catch (error) {
    console.error(error);
    m.reply('An error occurred while processing your request.');
  }
};

handler.help = ['ytmp4'];
handler.command = ['ytmp4'];
handler.tags = ['downloader'];

module.exports = handler;

async function ytdlnew(videoUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('query', videoUrl);
      searchParams.append('vt', 'mp3');
      const searchResponse = await axios.post(
        'https://tomp3.cc/api/ajax/search',
        searchParams.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
      if (searchResponse.data.status !== 'ok') {
        throw new Error('Failed to search for the video.');
      }
      const videoId = searchResponse.data.vid;
      const videoTitle = searchResponse.data.title;
      const mp4Options = searchResponse.data.links.mp4;
      const mediumQualityMp4Option = mp4Options[136];
      const mp4ConvertParams = new URLSearchParams();
      mp4ConvertParams.append('vid', videoId);
      mp4ConvertParams.append('k', mediumQualityMp4Option.k);
      const mp4ConvertResponse = await axios.post(
        'https://tomp3.cc/api/ajax/convert',
        mp4ConvertParams.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      );
      if (mp4ConvertResponse.data.status !== 'ok') {
        throw new Error('Failed to convert the video to MP4.');
      }
      const mp4DownloadLink = mp4ConvertResponse.data.dlink;
      resolve({
        title: videoTitle,
        mp4DownloadLink
      });
    } catch (error) {
      reject('Error: ' + error.message);
    }
  });
}
