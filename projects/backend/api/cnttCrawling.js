const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')

router.get('/', async (req, res) => {
  res.json('Hello from Cao Thang API crawling')
})

router.post('/', async (req, res) => {
  try {
    const href = req.body.href
    const listUrl = req.body.listUrl
    const title = req.body.title
    const url = req.body.url
    const wrapper = req.body.wrapper
    const time = req.body.time
    const data = await crawlDanhSachBaiViet(url, wrapper, title, href, time, listUrl)
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

async function crawlDanhSachBaiViet(url, wrapper, title, href, time, listUrl) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  let result = []
  if (listUrl === true) {
    $(wrapper).each(function () {
      result.push({
        title: $(this).find(title).text(),
        time: $(this).find(time).text(),
        href: $(this).find(href).attr('href')
      })
    })
  } else {
    result.push({
      title: $('title').text(),
      href: url
    })
  }
  return result
}

module.exports = router