import { Component, OnInit } from '@angular/core';


//Services
import { ModalService } from '../../../../services/modal.service';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { LopHocPhanService } from '../../../../services/lophocphan.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { GvlhpService } from '../../../../services/gvlhp.service';

//interfaces
import { CTDT } from '../../../../interfaces/ctdt.interface';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { LopHocPhan } from '../../../../interfaces/lophocphan.interface';
import { nganhnghe } from '../../../../interfaces/NganhNghe.interface';
import { GVLHP } from '../../../../interfaces/gvlhp.interface';

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
  dsBac: bac[];
  dsNganhNghe: nganhnghe[];
  dsMaLoaiMonHoc: string[];
  dsGVLHP = [];
  dsGV = [
    { maGiaoVien: "001", ho: "Ngyễn", ten: "Hoàng Linh" },
    { maGiaoVien: "002", ho: "Ngyễn", ten: "Hoàng Phong" },
    { maGiaoVien: "003", ho: "Ngyễn", ten: "Hoàng Huy" },
    { maGiaoVien: "004", ho: "Ngyễn", ten: "Hoàng Hưng" },
    { maGiaoVien: "005", ho: "Ngyễn", ten: "Hoàng Tân" },
  ];

  ctdt: CTDT = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "17",
    maLoaiHinhDaoTao: "1",
  };

  isChanged = false;

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
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
    let maBac = parseInt(this.ctdt.maBac);
    this.nganhNgheService.getNganhNghebymaBac(maBac).subscribe(dsnn => {
      this.dsNganhNghe = dsnn;
      if (dsnn.length !== 0) {
        this.ctdt.maNganhNghe = dsnn[0].maNganhNghe;
      }
    });
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.lopHocPhanService.getLopHocPhanbyCTDTandHocKi(this.maChuongTrinhDaoTao, this.hocKi).subscribe(data => {
      this.dsLHP = data.dsLHP;
      this.dsMaLoaiMonHoc = data.dsMaLoaiMonHoc;
      this.dsGVLHP = data.dsGVLHP;
    });
  }


  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private lopHocPhanService: LopHocPhanService,
    private nganhNgheService: NganhNgheService,
    private gvlhpService: GvlhpService,) {
  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.loadGVLHP();
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
