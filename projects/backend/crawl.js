const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

exports.crawl = async function () {
  console.log('Crawl running')

  const URL_THONGBAO_TRUONG = 'https://caothang.edu.vn/bai_viet/Thong-Bao-9' // SELECTOR: .ten.dam
  const URL_THONGBAO_DOAN = 'https://doanhoi.caothang.edu.vn/Tin-Tuc---Su-Kien/Tin-Tuc-66' // SELECTOR: .ten.dam
  const URL_THONGBAO_KHOA_GDDC = 'https://gddc.caothang.edu.vn/Tong-quan/Thong-bao-cua-Khoa-66' // SELECTOR: .ten.dam
  const URL_THONGBAO_KHOA_CNTT_CD = 'https://cntt.caothang.edu.vn/thong-bao-he-cao-dang-chinh-qui' // SELECTOR: overlay-top
  const URL_THONGBAO_KHOA_CNTT_CDN = 'https://cntt.caothang.edu.vn/thong-bao-he-cao-dang-nghe' // SELECTOR: overlay-top

  const thongBaoTruong = await crawlDanhSachBaiVietTruong(URL_THONGBAO_TRUONG)
  const thongBaoDoan = await crawlDanhSachBaiVietTruong(URL_THONGBAO_DOAN)
  const thongBaoKhoaGDDC = await crawlDanhSachBaiVietTruong(URL_THONGBAO_KHOA_GDDC)
  const thongBaoKhoaCNTTCD = await crawlDanhSachBaiVietKhoa(URL_THONGBAO_KHOA_CNTT_CD)
  const thongBaoKhoaCNTTCDN = await crawlDanhSachBaiVietKhoa(URL_THONGBAO_KHOA_CNTT_CDN)

  // console.log(thongBaoTruong)
  // console.log(thongBaoDoan)
  // console.log(thongBaoKhoaGDDC)
  // console.log(thongBaoKhoaCNTTCD)
  // console.log(thongBaoKhoaCNTTCDN)

  console.log('Crawl done.')
}

async function getBody(url) {
  const body = await axios.get(url)
  const $ = cheerio.load(body.data)
  return $
}

async function crawlDanhSachBaiVietTruong(url) {
  const $ = await getBody(url)
  let result = []
  $('.ds_bai_viet').each(function () {
    result.push({
      href: $(this).find('.ten.dam').attr('href'),
      title: $(this).find('.ten.dam').text(),
      time: $(this).find('.mo.nghien').text()
    })
  })
  return result
}

async function crawlDanhSachBaiVietKhoa(url) {
  const $ = await getBody(url)
  let result = []
  $('.event-item').each(function () {
    result.push({
      href: $(this).find('.overlay-top').attr('href'),
      title: $(this).find('.overlay-top').attr('title'),
      time: $(this).find('.day').text() + ' ' +  $(this).find('.month').text() + ' ' +  $(this).find('.year').text()
    })
  })
  return result
}

async function crawlChiTietBaiVietTruong(url) {
  const $ = await getBody(url)
  let result = {}
  result.title = $('title').text()
  result.data = $('#noi_dung').html()
  return result
}

async function crawlChiTietBaiVietKhoa(url) {
  const $ = await getBody(url)
  let result = {}
  result.title = $('title').text()
  result.data = $('.single-content').html()
  return result
}