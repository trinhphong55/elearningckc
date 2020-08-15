import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

//Services
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocService } from '../../../../services/lop-hoc.service';
import { FileService } from '../../../../../../../elearning/src/app/services/file.service';
import { PhonghocService } from '../../../../services/phonghoc.service';

//interfaces
import { CTDT } from '../../../../interfaces/ctdt.interface';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { LopHoc } from '../../../../interfaces/LopHoc.interface';
import { PhongHoc } from '../../../../interfaces/PhongHoc.interface';

@Component({
  selector: 'app-modal-lichphonghoc',
  templateUrl: './modal-lichphonghoc.component.html',
  styleUrls: ['./modal-lichphonghoc.component.css']
})
export class ModalLichphonghocComponent implements OnInit {

  private maChuongTrinhDaoTao: string;
  dsLoaiHinhDaoTao: LHDT[];
  dsLH: LopHoc[];
  dsBac: bac[];

  ctdt: CTDT = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "17",
    maLoaiHinhDaoTao: "1",
  };

  tongTuan: string[] = [];

  lichHoc = [
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", ""
  ];

  hocKi = 1;
  namHoc = 2019;
  lichPhongHoc = [
    {
      maLopHoc: "30061711",
      lichHoc: [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", ""
      ]
    },
    {
      maLopHoc: "30061712",
      lichHoc: [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", ""
      ]
    },
    {
      maLopHoc: "30061713",
      lichHoc: [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", ""
      ]
    },
    {
      maLopHoc: "30061714",
      lichHoc: [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", ""
      ]
    },
    {
      maLopHoc: "30061715",
      lichHoc: [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", ""
      ]
    }
  ]

  // dsPhong = [
  //   "F7.1", "F7.2", "F7.3", "F7.4"
  // ]
  dsPhong: PhongHoc[];

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
  }

  private loadLPH() {
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.lopHocService.getDSLopHocbymaCTDT(this.maChuongTrinhDaoTao).subscribe(dslop => {
      this.dsLH = dslop;
    });
    this.phongHocService.getPhongHoc().subscribe(dsphong => {
      this.dsPhong = dsphong;
    }, error => console.log(error));
  }


  select() {
    this.lichPhongHoc = [
      {
        maLopHoc: "30061711",
        lichHoc: [
          "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "",
          "", "", "", ""
        ]
      },
      {
        maLopHoc: "30061712",
        lichHoc: [
          "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "",
          "", "", "", ""
        ]
      },
      {
        maLopHoc: "30061713",
        lichHoc: [
          "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "",
          "", "", "", ""
        ]
      },
      {
        maLopHoc: "30061714",
        lichHoc: [
          "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "",
          "", "", "", ""
        ]
      },
      {
        maLopHoc: "30061715",
        lichHoc: [
          "", "", "", "", "", "", "", "",
          "", "", "", "", "", "", "", "",
          "", "", "", ""
        ]
      }
    ]
  }

  selectBac() {
    alert('oke');
  }

  // select() {
  //   alert("change");
  // }

  selectPhongHoc(maPhong: string, sttTuan: number, sttLop: number) {
    // this.lichPhongHoc[sttLop].lichHoc[sttTuan] = maPhong;
    console.log(maPhong, sttTuan, sttLop);
    if (maPhong !== "") {
      for (let i = sttTuan + 1; i < this.tongTuan.length; i++) {
        if (this.lichPhongHoc[sttLop].lichHoc[i] === "") {
          this.lichPhongHoc[sttLop].lichHoc[i] = maPhong;
        }
      }
    }
  }

  saveLPH() {
    console.log(this.lichPhongHoc);
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private lopHocService: LopHocService,
    private phongHocService: PhonghocService,
    private fileService: FileService) {

  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.loadLPH();
    for (let i = 1; i <= 20; i++) {
      this.tongTuan.push(`Tuần ${i}`);
    }
  }
}
