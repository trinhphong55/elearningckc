import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { CrawlingService } from '../../../../services/cntt/crawling.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-crawling',
  templateUrl: './modal-crawling.component.html',
  styleUrls: ['./modal-crawling.component.css'],
})
export class ModalCrawlingComponent implements OnInit {
  private infoCrawling: any;
  private resultCrawling: any;

  public danhSachBaiVietDaLuu: any = [];
  public danhSachBaiViet: any = [];
  public donVi: any[] = [
    {
      name: 'Trường',
      nhomBaiViet: [
        {
          name: 'Thông báo',
          selector: {
            url: 'https://caothang.edu.vn/bai_viet/Thong-Bao-9',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Lịch công tác tuần',
          selector: {
            url: 'https://caothang.edu.vn/bai_viet/Lich-Cong-Tac-Tuan-14',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Tin Cao Thắng',
          selector: {
            url: 'https://caothang.edu.vn/bai_viet/Tin-Cao-Thang-8',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Tin giáo dục',
          selector: {
            url: 'https://caothang.edu.vn/bai_viet/Tin-Giao-Duc-17',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
      ],
    },
    {
      name: 'Phòng kế toán',
      nhomBaiViet: [
        {
          name: 'Thông báo dành cho sinh viên',
          selector: {
            url: 'https://tckt.caothang.edu.vn/Danh-cho-HSSV-8',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: 'a:first-of-type',
            title: 'a:first-of-type',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Công khai tài chính',
          selector: {
            url: 'https://tckt.caothang.edu.vn/Cong-khai-tai-chinh-2',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
      ],
    },
    {
      name: 'Phòng đào tạo',
      nhomBaiViet: [
        {
          name: 'Lịch đào tạo',
          selector: {
            url:
              'https://daotao.caothang.edu.vn/bai-viet/2-Lich-dao-tao-938675f0e9064d27e576fa4894cf84a1.html',
            wrapper: '.file_content',
          },
        },
        {
          name: 'Lịch thi',
          selector: {
            url:
              'https://daotao.caothang.edu.vn/bai-viet/18-Lich-thi-hoc-ky-1-nam-hoc-2019-2020-d018423653a651725386b5b1f8f089a4.html',
            wrapper: '.file_content',
          },
        },
        {
          name: 'Thời khoá biểu',
          selector: {
            url:
              'https://daotao.caothang.edu.vn/bai-viet/18-Thoi-khoa-bieu-hoc-ky-2-nam-hoc-2019-2020-f310ea59f54405dab4161334c67045c6.html',
            wrapper: '.file_content',
          },
        },
        {
          name: 'Thông báo sinh viên',
          selector: {
            url: 'https://daotao.caothang.edu.vn/Thong-bao-sinh-vien-18',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Tra cứu kết quả xét học tiếp',
          selector: {
            url: 'https://daotao.caothang.edu.vn/xet-dieu-kien-hoc-tiep-13',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
        {
          name: 'Tra cứu kết quả xét tốt nghiệp',
          selector: {
            url: 'https://daotao.caothang.edu.vn/xet-du-thi-tot-nghiep-65',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
      ],
    },
    {
      name: 'CTCT - HSSV',
      nhomBaiViet: [
        {
          name: 'Kế hoạch phòng học',
          selector: {
            url:
              'https://ctct.caothang.edu.vn/Ke-hoach-phong-hoc/0--Ke-hoach-su-dung-phong-hoc-ly-thuyet-ce2eb8c297e70869863a0248fd614762.html',
            wrapper: '.chi_tiet_bai_viet',
          },
        },
        {
          name: 'Thông báo giáo viên chủ nhiệm',
          selector: {
            url:
              'https://ctct.caothang.edu.vn/Cong-tac-GVCN/0-Cong_tac_giao_vien_chu_nhiem-cdb25cb6be539f9d941eadd3cd8c6ffd.html',
            wrapper: '.file_content',
          },
        },
        {
          name: 'Biểu mẫu dành cho HSSV',
          selector: {
            url:
              'https://ctct.caothang.edu.vn/Bieu-mau/2-Bieu-mau-dnah-cho-HSSV-ad1fe4cc5297b5fb063c47af46b629f6.html',
            wrapper: '.file_content',
          },
        },
        {
          name: 'Biểu mẫu dành cho giáo viên',
          selector: {
            url:
              'https://ctct.caothang.edu.vn/Bieu-mau/2-Bieu-mau-1b14d030c482990c834a597c56440685.html',
            wrapper: '.file_content',
          },
        },
      ],
    },
    {
      name: 'Đoàn - Hội',
      nhomBaiViet: [
        {
          name: 'Tin mới nhất',
          selector: {
            url: 'https://doanhoi.caothang.edu.vn/',
            wrapper: '.tin_moi_cu:first-child li',
            wrapperContent: '#noi_dung',
            href: 'a',
            title: 'a',
            listUrl: true,
          },
        },
      ],
    },
    {
      name: 'Khoa GDDC',
      nhomBaiViet: [
        {
          name: 'Tin mới nhất',
          selector: {
            url: 'https://gddc.caothang.edu.vn/',
            wrapper: '.tin_moi_cu li',
            wrapperContent: '#noi_dung',
            href: 'a',
            title: 'a',
            listUrl: true,
          },
        },
        {
          name: 'Thông báo',
          selector: {
            url: 'https://gddc.caothang.edu.vn/Tong-quan/Thong-bao-cua-Khoa-66',
            wrapper: '.ds_bai_viet',
            wrapperContent: '#noi_dung',
            href: '.ten.dam',
            title: '.ten.dam',
            time: '.mo.nghien',
            listUrl: true,
          },
        },
      ],
    },
  ];
  public nhomDonVi: any[] = [];
  public showSkeleton: Boolean = false;
  public disableButton: Boolean = false;

  constructor(
    private modalService: ModalService,
    private crawlingService: CrawlingService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDanhSachBaiVietDaCrawled();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onChangeSelectLoaiDonVi(value) {
    const filtered = this.donVi.filter((i) => i.name === value);
    this.nhomDonVi = [];
    for (const item of filtered[0].nhomBaiViet) {
      this.nhomDonVi.push(item);
    }
  }

  getValueNhomBaiViet(value) {
    const filtered = this.nhomDonVi.filter((i) => i.name === value);
    this.infoCrawling = filtered[0];
  }

  getDanhSachBaiVietDaCrawled(): void {
    this.crawlingService.getDanhSachBaiVietDaCrawled().subscribe((data) => {
      this.danhSachBaiVietDaLuu = data;
    });
  }

  onStartCrawl() {
    if (!this.infoCrawling) {
      this.toastrService.error('Vui lòng chọn các thông tin', 'Thông báo', {
        timeOut: 4000,
      });
      // alert('Vui lòng chọn nhóm bài viết');
      return;
    }
    this.showSkeleton = true;
    this.disableButton = true;
    this.crawlingService
      .getDanhSachBaiViet(this.infoCrawling.selector)
      .subscribe((data) => {
        this.resultCrawling = data;
        this.danhSachBaiViet = data.danhSachBaiViet;
        // console.log('=========== crawling thành công ===========');
        // console.log(this.danhSachBaiViet);
        // console.log('=========== crawling đã lưu ===========');
        // console.log(this.danhSachBaiVietDaLuu);
        for (const item of this.danhSachBaiViet) {
          for (const subItem of this.danhSachBaiVietDaLuu.data) {
            if (item.href === subItem.crawlURL) {
              item.daLuu = true;
            }
          }
        }
        // console.log('=========== crawling thành công ===========');
        // console.log(this.danhSachBaiViet);
        this.disableButton = false;
        this.showSkeleton = false;
      });
  }

  onSaveBaiViet(url: string) {
    this.crawlingService
      .saveBaiViet({
        url: url,
        wrapperContent: this.resultCrawling.wrapperContent,
      })
      .subscribe((data) => {
        // console.log('=========== save ===========');
        // console.log(data);
        this.danhSachBaiViet = this.danhSachBaiViet.filter(
          (x) => x.href !== url
        );
        // alert('Lưu thành công');
        this.toastrService.success('Lưu thành công', 'Thông báo', {
          timeOut: 4000,
        });
      });
  }
}
