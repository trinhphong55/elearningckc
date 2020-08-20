const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const BaiViet = require("../models/cntttintuc.model");

const BaiVietTruong = [
  {
    name: "Thông báo",
    selector: {
      url: "https://caothang.edu.vn/bai_viet/Thong-Bao-9",
      wrapper: ".ds_bai_viet",
      wrapperContent: "#noi_dung",
      href: ".ten.dam",
      title: ".ten.dam",
      time: ".mo.nghien",
      listUrl: true,
    },
  },
  {
    name: "Lịch công tác tuần",
    selector: {
      url: "https://caothang.edu.vn/bai_viet/Lich-Cong-Tac-Tuan-14",
      wrapper: ".ds_bai_viet",
      wrapperContent: "#noi_dung",
      href: ".ten.dam",
      title: ".ten.dam",
      time: ".mo.nghien",
      listUrl: true,
    },
  },
];

const ThoiGianDangBai = {
  time: "18:00:00",
  date: moment().weekday(5).format("DD/MM/YYYY"), // Thứ 6 hằng tuần, Monday(0) -> Sunday(6)
  dateTime: "",
};

ThoiGianDangBai.dateTime = moment(
  `${ThoiGianDangBai.time} ${ThoiGianDangBai.date}`,
  "HH:mm:ss DD/MM/YYYY"
).format("HH:mm:ss, DD/MM/YYYY");

setInterval(() => {
  // console.log('Run Auto Crawl after ',moment().diff(moment(ThoiGianDangBai.dateTime, "HH:mm:ss, DD/MM/YYYY"), "seconds"), 'seconds.');
  // console.log(moment().diff(moment(ThoiGianDangBai.dateTime, "HH:mm:ss, DD/MM/YYYY"), "seconds"));
  if (
    moment().diff(
      moment(ThoiGianDangBai.dateTime, "HH:mm:ss, DD/MM/YYYY"),
      "seconds"
    ) === 0
  ) {
    console.log("Run auto crawl");
    crawlThongBaoVaLichCongTacTuanCuaTruong();
    //#region đặt thời gian vào tuần tiếp theo
    ThoiGianDangBai.date = moment().add(1, "weeks").format("DD/MM/YYYY");
    ThoiGianDangBai.dateTime = moment(
      `${ThoiGianDangBai.time} ${ThoiGianDangBai.date}`,
      "HH:mm:ss DD/MM/YYYY"
    ).format("HH:mm:ss, DD/MM/YYYY");
    //#endregion
  }
}, 1000);

//#region RESTful API
router.get("/", async (req, res) => {
  const data = await BaiViet.find({
    crawling: true,
  });
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
      anhBia: "uploads/cntt/default.png",
      nguoiViet: "crawl",
    });
    await baiViet.save();
    res.status(201).json({
      message: "Crawling: Lưu bài viết thành công.",
    });
  } catch (error) {
    res.json({
      message: "Crawling: Lưu bài viết thất bại.",
      error: error,
    });
  }
});
//#endregion

async function crawlDanhSachBaiViet(
  url,
  wrapper,
  wrapperContent,
  title,
  href,
  time,
  listUrl
) {
  const body = await axios.get(encodeURI(url));
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

async function crawlChiTietBaiViet(url, wrapper) {
  const body = await axios.get(encodeURI(url));
  const $ = cheerio.load(body.data);
  let result = {};
  result.title = $("title").text();
  result.data = $(wrapper).html();
  return result;
}

async function crawlThongBaoVaLichCongTacTuanCuaTruong() {
  console.log("start crawl");
  const DanhSachThongBao = await crawlDanhSachBaiViet(
    BaiVietTruong[0].selector.url,
    BaiVietTruong[0].selector.wrapper,
    BaiVietTruong[0].selector.wrapperContent,
    BaiVietTruong[0].selector.title,
    BaiVietTruong[0].selector.href,
    BaiVietTruong[0].selector.time,
    BaiVietTruong[0].selector.listUrl
  );
  const DanhSachLichCongTacTuan = await crawlDanhSachBaiViet(
    BaiVietTruong[1].selector.url,
    BaiVietTruong[1].selector.wrapper,
    BaiVietTruong[1].selector.wrapperContent,
    BaiVietTruong[1].selector.title,
    BaiVietTruong[1].selector.href,
    BaiVietTruong[1].selector.time,
    BaiVietTruong[1].selector.listUrl
  );

  // Lấy danh sách bài viết đã lưu trong DB
  const BaiVietDaLuu = await BaiViet.find({
    crawling: true,
  });

  // Lọc những bài viết chưa lưu
  const filterDanhSachThongBao = compareArray(
    DanhSachThongBao.danhSachBaiViet,
    BaiVietDaLuu
  );

  // console.log(DanhSachThongBao.wrapperContent);

  const filterDanhSachLichCongTacTuan = compareArray(
    DanhSachLichCongTacTuan.danhSachBaiViet,
    BaiVietDaLuu
  );

  // console.log("filterDanhSachThongBao: ", filterDanhSachThongBao.length);

  if (filterDanhSachThongBao.length > 0) {
    for (const item of filterDanhSachThongBao) {
      // console.log(item.href);
      luuBaiViet(item, DanhSachThongBao.wrapperContent);
    }
  }

  // console.log(
  //   "filterDanhSachLichCongTacTuan: ",
  //   filterDanhSachLichCongTacTuan.length
  // );

  if (filterDanhSachLichCongTacTuan.length > 0) {
    for (const item of filterDanhSachLichCongTacTuan) {
      // console.log(item.href);
      luuBaiViet(item, DanhSachLichCongTacTuan.wrapperContent);
    }
  }
  console.log("crawl done");
}

// function compareArray(array1, array2) {
function compareArray(array1, array2) {
  for (const item of array1) {
    const filter = array2.filter((f) => {
      f.crawlURL == item.href;
      if (f.crawlURL === item.href) {
        item.daLuu = true;
        // console.log("da luu");
      }
    });
  }
  // console.log("done compare");
  // console.log(array1.length);
  const result = array1.filter((f) => f.daLuu !== true);
  // console.log(result);
  // console.log(result.length);
  return result;
}

async function luuBaiViet(data, wrapperContent) {
  try {
    const url = data.href;
    const chiTietBaiViet = await crawlChiTietBaiViet(url, wrapperContent);
    const baiViet = new BaiViet({
      tieuDe: chiTietBaiViet.title,
      noiDung: chiTietBaiViet.data,
      trangThai: 2,
      thoiGianDangBai: Date.now(),
      crawling: true,
      crawlURL: url,
      anhBia: "uploads/cntt/default.png",
      nguoiViet: "crawl",
    });
    await baiViet.save();
    console.log("Auto crawl: save successfully");
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
