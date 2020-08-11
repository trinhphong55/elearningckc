import { Component, OnInit } from '@angular/core';


//Services
import { ModalService } from '../../../../services/modal.service';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { GvlhpService } from '../../../../services/gvlhp.service';
import { LopHocService } from '../../../../services/lop-hoc.service';
import { ApiService } from '../../../../services/api.service';

//interfaces
import { CTDT } from '../../../../interfaces/ctdt.interface';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { LopHocPhan } from '../../../../interfaces/lophocphan.interface';
import { nganhnghe } from '../../../../interfaces/NganhNghe.interface';
import { LopHoc } from '../../../../interfaces/LopHoc.interface';
import { GiaoVien } from '../../../../../models/giaoVien';


@Component({
  selector: 'app-modal-giaovienlophocphan',
  templateUrl: './modal-giaovienlophocphan.component.html',
  styleUrls: ['./modal-giaovienlophocphan.component.css'],
  providers: [LHDTService, BacService, NganhNgheService, LopHocPhanService, GvlhpService]
})
export class ModalGiaovienlophocphanComponent implements OnInit {

  private maChuongTrinhDaoTao: string;
  hocKi = "1";

  dsLoaiHinhDaoTao: LHDT[];
  dsLHP: LopHocPhan[];
  dsLHPOrigin: LopHocPhan[];
  dsLH: LopHoc[];
  dsBac: bac[];
  dsNganhNghe: nganhnghe[];
  dsGVLHP: object[];

  dsGV: GiaoVien[];

  ctdt: CTDT = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "17",
    maLoaiHinhDaoTao: "1",
  };

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
  }

  selectLopHoc(maLopHoc: string) {
    if (maLopHoc === "all") {
      this.dsLHP = this.dsLHPOrigin;
      return;
    }
    let dsFilterbymaLopHoc = this.dsLHPOrigin.filter(item => item.maLopHoc === maLopHoc);
    console.log(maLopHoc ,dsFilterbymaLopHoc);
    this.dsLHP = dsFilterbymaLopHoc;
  }

  selectBac() {
    let maBac = parseInt(this.ctdt.maBac);
    this.nganhNgheService.getNganhNghebymaBac(maBac).subscribe(dsnn => {
      this.dsNganhNghe = dsnn;
      if (dsnn.length !== 0) {
        this.ctdt.maNganhNghe = dsnn[0].maNganhNghe;
      }
      this.loadGVLHP();
    });
  }

  select() {
    this.loadGVLHP();
  }

  changeGiaoVien(maGV: string, maLopHocPhan: string) {
    this.gvlhpService.changeGVLHP(maGV, maLopHocPhan).subscribe(data => {
      console.log(data);
    });
  }

  private loadGVLHP() {
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.lopHocPhanService.getLopHocPhanbyCTDTandHocKi(this.maChuongTrinhDaoTao, this.hocKi).subscribe(data => {
      this.dsLHP = data;
      this.dsLHPOrigin = data;
    });
    this.lopHocService.getDSLopHocbymaCTDT(this.maChuongTrinhDaoTao).subscribe(dslop => this.dsLH = dslop);
  }


  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private lopHocPhanService: LopHocPhanService,
    private nganhNgheService: NganhNgheService,
    private gvlhpService: GvlhpService,
    private lopHocService: LopHocService,
    private giaovienService: ApiService) {
  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.nganhNgheService.getNganhNghebymaBac(parseInt(this.ctdt.maBac)).subscribe(dsnn => this.dsNganhNghe = dsnn);
    this.giaovienService.layDanhSachGiaoVien().subscribe(dsgv => this.dsGV = dsgv);
    this.loadGVLHP();
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
