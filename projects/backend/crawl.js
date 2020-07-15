const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const URL = 'https://caothang.edu.vn/bai_viet/Thong-Bao-9'

exports.crawl = async function () {
  console.log('Crawl running')
  fs.unlinkSync('crawl.txt') // Xoá file crawl.txt cũ

  const $ = await getBody(URL);
  let danhSachThongBaoMoiNhat = []
  let chiTietThongBaoMoiNhat = {}

  $('.ds_bai_viet_tieu_de .ten.dam').each(function () {
    danhSachThongBaoMoiNhat.push({
      href: $(this).attr('href'),
      title: $(this).text()
    })
  })
  // console.log(danhSachThongBaoMoiNhat)

  const $$ = await getBody(danhSachThongBaoMoiNhat[0].href)

  chiTietThongBaoMoiNhat.title = $$('title').text()
  chiTietThongBaoMoiNhat.data = $$('#noi_dung').html()
  // console.log(chiTietThongBaoMoiNhat)

  fs.appendFileSync('crawl.txt', chiTietThongBaoMoiNhat.data) // tạo file crawl.txt mới
  console.log('Done. File crawl.txt created.')
}

async function getBody(url) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  return $;
}