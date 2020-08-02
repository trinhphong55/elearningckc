import { Component, OnInit } from '@angular/core';

//Services
import { ModalService } from '../../../../services/modal.service';
import { KHDTService } from '../../../../services/khdt.service';
import { MonhocService } from '../../../../services/monhoc.service';
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';


//interfaces
import { KHDT } from '../../../../interfaces/khdt.interface';
import { MonHoc } from '../../../../interfaces/monhoc.interface';
import { CTDT } from '../../../../interfaces/ctdt.interface';
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { nganhnghe } from '../../../../interfaces/NganhNghe.interface';



@Component({
  selector: 'app-modal-kehoachdaotao',
  templateUrl: './modal-kehoachdaotao.component.html',
  styleUrls: ['./modal-kehoachdaotao.component.css'],
  providers: [KHDTService, MonhocService, LHDTService, BacService, NganhNgheService]
})
export class ModalKehoachdaotaoComponent implements OnInit {

  private maChuongTrinhDaoTao: string;
  dsKHDT: KHDT[];
  dsMonHoc: MonHoc[];
  hocKi = "1";
  dsLoaiHinhDaoTao: LHDT[];
  dsNganhNghe: nganhnghe[];
  dsBac: bac[];

  ctdt: CTDT = {
    maBac: "3",
    maNganhNghe: "006",
    khoaHoc: "20",
    maLoaiHinhDaoTao: "1",
  };

  isChanged = false;

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
  }

  select() {
    if (this.isChanged) {
      let a = confirm("may da thay doi, co muon luu khong?");
      if (a) {
        this.saveKHDT();
      }
    }
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.khdtService.getKHDTByHocKiNMaCTDT(this.maChuongTrinhDaoTao, this.hocKi)
    .subscribe(dskhdt => this.dsKHDT = dskhdt);
    this.isChanged = false;
  }

  addNewKHDT() {
    this.isChanged = true;
    let newKHDT: KHDT = {
      hocKi: parseInt(this.hocKi), maChuongTrinhDaoTao: this.maChuongTrinhDaoTao,
      maBoMon: "001", maDaoTao: this.maChuongTrinhDaoTao + this.dsMonHoc[0].maMonHoc,
      donViHocTrinh: 15, soTietHoc: 45, soTuan: 15, maMonHoc: this.dsMonHoc[0].maMonHoc,
      loaiTienThu: 'Lý thuyết', tinh: false, xet: false,
    };
    this.dsKHDT.push(newKHDT);
    // console.log(this.dsKHDT);
  }

  removeKHDT(index: number) {
    if (this.dsKHDT !== []){
      this.dsKHDT.splice(index,1);
      this.isChanged = true;
    }
  }

  selectMonHoc(index: number) {
    this.isChanged = true;
    this.dsKHDT[index].maDaoTao = this.dsKHDT[index].maChuongTrinhDaoTao + this.dsKHDT[index].maMonHoc;
  }

  saveKHDT() {
    this.khdtService.addDSKHDT(this.ctdt, this.dsKHDT).subscribe(status => {
      // console.log(status);
      if (status.success) {
        alert(status.success);
        this.isChanged = false;
      }
      else if (status.error) {
        alert(status.error);
      }
      else {
        alert(status);
      }
    })
  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.nganhNgheService.getNganhnghe().subscribe(dsnn => this.dsNganhNghe = dsnn);
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.monhocService.getMonHoc().subscribe(dsmonhoc => this.dsMonHoc = dsmonhoc);
    this.khdtService.getKHDTByHocKiNMaCTDT(this.maChuongTrinhDaoTao,"1").subscribe(dskhdt => this.dsKHDT = dskhdt);
  }

  constructor(
    private modalService: ModalService,
    private khdtService: KHDTService,
    private monhocService: MonhocService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private nganhNgheService: NganhNgheService) {

    }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
