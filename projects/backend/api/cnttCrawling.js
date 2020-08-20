const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const BaiViet = require("../models/cntttintuc.model");

const ThoiGianDangBai = {
  time: "18:00:00",
  date: moment().weekday(6).format("DD/MM/YYYY"), // Thứ 6 hằng tuần
  dateTime: "",
};

ThoiGianDangBai.dateTime = moment(
  `${ThoiGianDangBai.time} ${ThoiGianDangBai.date}`,
  "HH:mm:ss DD/MM/YYYY"
).format("HH:mm:ss, DD/MM/YYYY");

// console.log(ThoiGianDangBai);

// setInterval(() => {
//   // console.log(
//   //   moment().diff(
//   //     moment(ThoiGianDangBai.dateTime, "HH:mm:ss, DD/MM/YYYY"),
//   //     "seconds"
//   //   )
//   // );
//   if (
//     moment().diff(
//       moment(ThoiGianDangBai.dateTime, "HH:mm:ss, DD/MM/YYYY"),
//       "seconds"
//     ) === 0
//   ) {
//     // console.log("true");
//     ThoiGianDangBai.date = moment().add(1, "weeks").format("DD/MM/YYYY");
//     ThoiGianDangBai.dateTime = moment(
//       `${ThoiGianDangBai.time} ${ThoiGianDangBai.date}`,
//       "HH:mm:ss DD/MM/YYYY"
//     ).format("HH:mm:ss, DD/MM/YYYY");
//     // console.log(ThoiGianDangBai);
//   }
// }, 1000);

router.get("/", async (req, res) => {
  const data = await BaiViet.find({ crawling: true });
  res.json({
    message: "Lấy danh sách bài viết crawling thành công",
    data: data,
  });
});

router.post("/", async (req, res) => {
  try {
    const href = req.body.href;
    const listUrl = req.body.listUrl;
    const title = req.body.title;
    const url = req.body.url;
    const wrapper = req.body.wrapper;
    const wrapperContent = req.body.wrapperContent;
    const time = req.body.time;
    const data = await crawlDanhSachBaiViet(
      url,
      wrapper,
      wrapperContent,
      title,
      href,
      time,
      listUrl
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/save", async (req, res) => {
  try {
    const url = req.body.url;
    const wrapperContent = req.body.wrapperContent;
    const data = await crawlChiTietBaiViet(url, wrapperContent);
    const baiViet = new BaiViet({
      tieuDe: data.title,
      noiDung: data.data,
      trangThai: 2,
      thoiGianDangBai: Date.now(),
      crawling: true,
      crawlURL: url,
    });
    await baiViet.save();
    res.status(201).json({ message: "Crawling: Lưu bài viết thành công." });
  } catch (error) {
    res.json({ message: "Crawling: Lưu bài viết thất bại.", error: error });
  }
});

async function crawlDanhSachBaiViet(
  url,
  wrapper,
  wrapperContent,
  title,
  href,
  time,
  listUrl
) {
  const body = await axios.get(url);
  const $ = cheerio.load(body.data);
  let result = {
    wrapperContent: wrapperContent,
    danhSachBaiViet: [],
  };
  if (listUrl === true) {
    $(wrapper).each(function () {
      result.danhSachBaiViet.push({
        title: $(this).find(title).text(),
        time: $(this).find(time).text(),
        href: $(this).find(href).attr("href"),
      });
    });
  } else {
    result.wrapperContent = wrapper;
    result.danhSachBaiViet.push({
      title: $("title").text(),
      href: url,
    });
  }
  return result;
}

async function crawlUrlDanhSachBaiViet(url, wrapper, href, listUrl) {
  const body = await axios.get(url);
  const $ = cheerio.load(body.data);
  let result = [];
  if (listUrl === true) {
    $(wrapper).each(function () {
      result.push($(this).find(href).attr("href"));
    });
  } else {
    result.push(url);
  }
  return result;
}

async function crawlChiTietBaiViet(url, wrapper) {
  const body = await axios.get(url);
  const $ = cheerio.load(body.data);
  let result = {};
  result.title = $("title").text();
  result.data = $(wrapper).html();
  return result;
}

module.exports = router;
