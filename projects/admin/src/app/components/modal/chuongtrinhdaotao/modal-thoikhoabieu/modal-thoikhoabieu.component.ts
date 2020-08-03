import { Component, OnInit } from '@angular/core';

//Services
import { ModalService } from '../../../../services/modal.service';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { LopHocService } from '../../../../services/lop-hoc.service';
import { MonhocService } from '../../../../services/monhoc.service';
import { ThoikhoabieuService } from '../../../../services/thoikhoabieu.service';

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

  dsLoaiHinhDaoTao: LHDT[];
  dsLH: LopHoc[];
  dsBac: bac[];
  dsNganhNghe: nganhnghe[];
  dsMonHoc: MonHoc[];
  TKB: [];

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
    this.dsMonHoc = [];
    this.maLopHoc = "null";
    this.TKB = [];
  }

  selectLopHocOrHocKi() {
    this.monhocService.getDSMonHocbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(dsmh => {
      this.dsMonHoc = dsmh;
    });
    if (this.maLopHoc !== "null") {
      this.thoikhoabieuService.getTKBbymaLopHocNhocKi(this.maLopHoc, parseInt(this.hocKi)).subscribe(tkb => {
        this.TKB = tkb;
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
    console.log(this.TKB);
    this.thoikhoabieuService.addTKB(this.maLopHoc, parseInt(this.hocKi), this.TKB).subscribe(result => {
      alert(result.message);
    })
  }

  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private nganhNgheService: NganhNgheService,
    private lopHocService: LopHocService,
    private monhocService: MonhocService,
    private thoikhoabieuService: ThoikhoabieuService,) {
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
