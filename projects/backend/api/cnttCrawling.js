const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')

const BaiViet = require('../models/cntttintuc.model')

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
    const wrapperContent = req.body.wrapperContent
    const time = req.body.time
    const data = await crawlDanhSachBaiViet(url, wrapper, wrapperContent, title, href, time, listUrl)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
})

router.post('/save', async (req, res) => {
  try {
    const url = req.body.url
    const wrapperContent = req.body.wrapperContent
    const data = await crawlChiTietBaiViet(url, wrapperContent)
    const baiViet = new BaiViet({
      tieuDe: data.title,
      noiDung: data.data,
      trangThai: 2
    })
    await baiViet.save()
    console.log('Crawling: Luu bai viet thanh cong.');
    res.status(201).json('Crawling: Lưu bài viết thành công.')
  } catch (error) {
    res.json(error)
  }
})

async function crawlDanhSachBaiViet(url, wrapper, wrapperContent, title, href, time, listUrl) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  let result = {
    wrapperContent: wrapperContent,
    danhSachBaiViet: []
  }
  if (listUrl === true) {
    $(wrapper).each(function () {
      result.danhSachBaiViet.push({
        title: $(this).find(title).text(),
        time: $(this).find(time).text(),
        href: $(this).find(href).attr('href')
      })
    })
  } else {
    result.wrapperContent = wrapper
    result.danhSachBaiViet.push({
      title: $('title').text(),
      href: url
    })
  }
  return result
}

async function crawlUrlDanhSachBaiViet(url, wrapper, href, listUrl) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  let result = []
  if (listUrl === true) {
    $(wrapper).each(function () {
      result.push($(this).find(href).attr('href'))
    })
  } else {
    result.push(url)
  }
  return result
}

async function crawlChiTietBaiViet(url, wrapper) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  let result = {}
  result.title = $('title').text()
  result.data = $(wrapper).html()
  return result
}

module.exports = router
