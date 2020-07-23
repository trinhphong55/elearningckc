import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-crawling',
  templateUrl: './modal-crawling.component.html',
  styleUrls: ['./modal-crawling.component.css']
})

export class ModalCrawlingComponent implements OnInit {
  public donVi: any[] = [{
    name: 'Trường',
    nhomBaiViet: [{
      name: 'Lịch công tác tuần cho giáo viên',
      url: 'https://caothang.edu.vn/bai_viet/Lich-Cong-Tac-Tuan-14',
      selector: '.ds_bai_viet'
    }]
  },
  {
    name: 'Phòng đào tạo',
    nhomBaiViet: [
      {
        name: 'Lịch đào tạo',
        url: 'https://daotao.caothang.edu.vn/bai-viet/2-Lich-dao-tao-938675f0e9064d27e576fa4894cf84a1.html',
        selector: '.file_content'
      },
      {
        name: 'Lịch thi',
        url: 'https://daotao.caothang.edu.vn/bai-viet/18-Lich-thi-hoc-ky-1-nam-hoc-2019-2020-d018423653a651725386b5b1f8f089a4.html',
        selector: '.file_content'
      },
      {
        name: 'Thời khoá biểu',
        url: 'https://daotao.caothang.edu.vn/bai-viet/18-Thoi-khoa-bieu-hoc-ky-2-nam-hoc-2019-2020-f310ea59f54405dab4161334c67045c6.html',
        selector: '.file_content'
      },
      {
        name: 'Thông báo sinh viên',
        url: 'https://daotao.caothang.edu.vn/Thong-bao-sinh-vien-18',
        selector: '.ds_bai_viet'
      },
      {
        name: 'Tra cứu kết quả xét học tiếp',
        url: 'https://daotao.caothang.edu.vn/xet-dieu-kien-hoc-tiep-13',
        selector: '.ds_bai_viet'
      },
      {
        name: 'Tra cứu kết quả xét tốt nghiệp',
        url: 'https://daotao.caothang.edu.vn/xet-du-thi-tot-nghiep-65',
        selector: '.ds_bai_viet'
      }
    ]
  },
  {
    name: 'CTCT - HSSV',
    nhomBaiViet: [
      {
        name: 'Kế hoạch phòng học',
        url: 'https://ctct.caothang.edu.vn/Ke-hoach-phong-hoc/0--Ke-hoach-su-dung-phong-hoc-ly-thuyet-ce2eb8c297e70869863a0248fd614762.html',
        selector: '.chi_tiet_bai_viet'
      },
      {
        name: 'Thông báo giáo viên chủ nhiệm',
        url: 'https://ctct.caothang.edu.vn/Cong-tac-GVCN/0-Cong_tac_giao_vien_chu_nhiem-cdb25cb6be539f9d941eadd3cd8c6ffd.html',
        selector: '.file_content'
      },
      {
        name: 'Biểu mẫu dành cho HSSV',
        url: 'https://ctct.caothang.edu.vn/Bieu-mau/2-Bieu-mau-dnah-cho-HSSV-ad1fe4cc5297b5fb063c47af46b629f6.html',
        selector: '.file_content'
      },
      {
        name: 'Biểu mẫu dành cho giáo viên',
        url: 'https://ctct.caothang.edu.vn/Bieu-mau/2-Bieu-mau-1b14d030c482990c834a597c56440685.html',
        selector: '.file_content'
      }
    ]
  },
  {
    name: 'Đoàn - Hội',
    nhomBaiViet: [
      {
        name: 'Tin mới nhất',
        url: 'https://doanhoi.caothang.edu.vn/',
        selector: '.tin_moi_cu:first-child a'
      }
    ]
  },
  {
    name: 'Khoa GDDC',
    nhomBaiViet: [
      {
        name: 'Tin mới nhất',
        url: 'https://gddc.caothang.edu.vn/',
        selector: '.tin_moi_cu a'
      },
      {
        name: 'Thông báo',
        url: 'https://gddc.caothang.edu.vn/Tong-quan/Thong-bao-cua-Khoa-66',
        selector: '.ten.dam'
      },
    ]
  },
  ];
  public nhomDonVi: any[] = [];
  private infoCrawling: any;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onChangeSelectLoaiDonVi(value) {
    const filtered = this.donVi.filter(i => i.name === value);
    this.nhomDonVi = [];
    for (const item of filtered[0].nhomBaiViet) {
      this.nhomDonVi.push(item);
    }
  }
  getValueNhomBaiViet(value) {
    const filtered = this.nhomDonVi.filter(i => i.name === value);
    this.infoCrawling = filtered[0];
  }
  onStartCrawl() {
    console.log('startCrawl');
    console.log(this.infoCrawling);
  }
}
