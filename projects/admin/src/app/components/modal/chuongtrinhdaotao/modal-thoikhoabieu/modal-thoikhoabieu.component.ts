import { Component, OnInit } from '@angular/core';
import saveAs from 'file-saver';

//Services
import { ModalService } from '../../../../services/modal.service';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { LopHocService } from '../../../../services/lop-hoc.service';
import { MonhocService } from '../../../../services/monhoc.service';
import { ThoikhoabieuService } from '../../../../services/thoikhoabieu.service';
import { FileService } from '../../../../../../../elearning/src/app/services/file.service';

//interfaces
import { CTDT } from '../../../../interfaces/ctdt.interface';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { nganhnghe } from '../../../../interfaces/NganhNghe.interface';
import { LopHoc } from '../../../../interfaces/LopHoc.interface';
import { MonHoc } from '../../../../interfaces/monhoc.interface';

@Component({
  selector: 'app-modal-thoikhoabieu',
  templateUrl: './modal-thoikhoabieu.component.html',
  styleUrls: ['./modal-thoikhoabieu.component.css']
})
export class ModalThoikhoabieuComponent implements OnInit {

  private maChuongTrinhDaoTao: string;
  hocKi = "1";
  maLopHoc = "null";
  tenLopHoc = "null";
  tuanBatDau: number;
  tuanKetThuc: number;
  TKB: [];
  disabelImportExcel = false;

  dsLoaiHinhDaoTao: LHDT[];
  dsLH: LopHoc[];
  dsBac: bac[];
  dsNganhNghe: nganhnghe[];
  dsMonHoc: MonHoc[];

  ctdt: CTDT = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "17",
    maLoaiHinhDaoTao: "1",
  };

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
  }

  private loadTKB() {
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.lopHocService.getDSLopHocbymaCTDT(this.maChuongTrinhDaoTao).subscribe(dslop => {
      this.dsLH = dslop;
    });
    // this.dsMonHoc = [];
    // First Lop Hoc
    let firstLop = this.maChuongTrinhDaoTao + "1";
    this.monhocService.getDSMonHocbymaLopHocNhocKi(firstLop, parseInt(this.hocKi)).subscribe(dsmh => {
      this.dsMonHoc = dsmh;
    });
    this.maLopHoc = "null";
    this.TKB = [];
  }

  selectLopHoc(indexLopHoc: number) {
    this.tenLopHoc = this.dsLH[indexLopHoc - 1].tenVietTat.toString();
    // this.monhocService.getDSMonHocbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(dsmh => {
    //   this.dsMonHoc = dsmh;
    // });
    this.thoikhoabieuService.getTKBbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(data => {
      this.TKB = data.TKB;
      this.tuanBatDau = data.tuanBatDau;
      this.tuanKetThuc = data.tuanKetThuc;
    });
  }

  selectHocKi() {
    this.monhocService.getDSMonHocbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(dsmh => {
      this.dsMonHoc = dsmh;
    });
    if (this.maLopHoc !== "null") {
      this.thoikhoabieuService.getTKBbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(data => {
        this.TKB = data.TKB;
        this.tuanBatDau = data.tuanBatDau;
        this.tuanKetThuc = data.tuanKetThuc;
      });
    }
  }

  selectBac() {
    let maBac = parseInt(this.ctdt.maBac);
    this.nganhNgheService.getNganhNghebymaBac(maBac).subscribe(dsnn => {
      this.dsNganhNghe = dsnn;
      if (dsnn.length !== 0) {
        this.ctdt.maNganhNghe = dsnn[0].maNganhNghe;
      }
      this.loadTKB();
    });
  }

  select() {
    this.loadTKB();
  }

  saveTKB() {
    if (this.maLopHoc === "null") {
      alert('Vui long chon lop hoc');
      return;
    }
    this.thoikhoabieuService.addTKB(this.maLopHoc, parseInt(this.hocKi), this.TKB, this.tuanBatDau, this.tuanKetThuc).subscribe(result => {
      alert(result.message);
    })
  }

  exportExcel() {
    if (this.maLopHoc === "null") {
      alert('Chon lop hoc');
      return;
    }
    this.disabelImportExcel = true;
    this.fileService.exportExcelTKB(this.maLopHoc, this.tenLopHoc, parseInt(this.hocKi)).subscribe(
      data => {
        if (data.type === "application/json") {
          alert('Chua co gi trong TKB');
        }
        if (data.type === "application/octet-stream"){
          saveAs(data, `TKB_${this.maLopHoc}_${this.tenLopHoc}_HK${this.hocKi}.xlsx`)
        }
        this.disabelImportExcel = false;
      },
      error => console.error(error));
  }

  printTKB() {
    window.print();
  }

  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private nganhNgheService: NganhNgheService,
    private lopHocService: LopHocService,
    private monhocService: MonhocService,
    private thoikhoabieuService: ThoikhoabieuService,
    private fileService: FileService) {
  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.nganhNgheService.getNganhNghebymaBac(parseInt(this.ctdt.maBac)).subscribe(dsnn => this.dsNganhNghe = dsnn);
    this.loadTKB();
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
