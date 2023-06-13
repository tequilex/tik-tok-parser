const express = require('express')
const SocksProxyAgent = require('socks-proxy-agent').SocksProxyAgent;
const cors = require('cors')
const axios = require('axios');
const HTMLParser = require('node-html-parser');

const PORT = 8080
let data = {}

const name = '@popka_mamont'
const idVideo = "7227436271063305477"

const torProxyAgent = new SocksProxyAgent("socks5://1UxJxJZn:rqQc7ayf@193.228.129.73:64929")

const app = express()
app.use(cors())

const options = {
  headers: {
    cookie: 'Zu94bekxrOA0e-M_j9RDVob1hUUV64IJgyM3KcP8O9pOcEP0YZfvT7RHTG2x7Fl5VUOJcMedOH32Lf-bZSQ_ZLHrd5nLlULGn4WC4lP9VtTjrvY1TNk6VBwzu3mKGczMmg4mBnQ=',
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      method: "GET"
  },
};

const mainTwo = async () => {

  const response = await axios.request({
    url: `https://www.tiktok.com/${name}/video/${idVideo}`,
    options,
    httpsAgent: torProxyAgent,
    // httpAgent: torProxyAgent,
  })

  const rootData = HTMLParser.parse(response.data)
  
  const sigiState = rootData.querySelector('#SIGI_STATE')

  const resultText = sigiState.text

  const json = JSON.parse(resultText)

  const result = {
    language: json.AppContext.appContext.language,
    region: json.AppContext.appContext.region,
    robotsContent: json.SEOState.metaParams.robotsContent,
    title: json.SEOState.metaParams.title,
    id: json.ItemModule[idVideo].id,
    createTime: json.ItemModule[idVideo].createTime,
    height: json.ItemModule[idVideo].video.height,
    width: json.ItemModule[idVideo].video.width,
    duration: json.ItemModule[idVideo].video.duration,
    ratio: json.ItemModule[idVideo].video.ratio,
    bitrate: json.ItemModule[idVideo].video.bitrate,
    encodedType: json.ItemModule[idVideo].video.encodedType,
    format: json.ItemModule[idVideo].video.format,
    videoQuality: json.ItemModule[idVideo].video.videoQuality,
    codecType: json.ItemModule[idVideo].video.codecType,
    qualityType: json.ItemModule[idVideo].video.bitrateInfo[0].QualityType,
    musicId: json.ItemModule[idVideo].music.id,
    musicTitle: json.ItemModule[idVideo].music.title,
    musicAuthor: json.ItemModule[idVideo].music.authorName,
    isOriginal: json.ItemModule[idVideo].music.original,
    musicDuration: json.ItemModule[idVideo].music.duration,
    likes: json.ItemModule[idVideo].stats.diggCount,
    shares: json.ItemModule[idVideo].stats.shareCount,
    comments: json.ItemModule[idVideo].stats.commentCount,
    plays: json.ItemModule[idVideo].stats.playCount,
    saves: json.ItemModule[idVideo].stats.collectCount,
    indexEnabled: json.ItemModule[idVideo].indexEnabled,
    location: json.ItemModule[idVideo].locationCreated
  }

  return data = result
}

app.get('/', async (req, res) => {
  await mainTwo()
  res.send(data)
})

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
})