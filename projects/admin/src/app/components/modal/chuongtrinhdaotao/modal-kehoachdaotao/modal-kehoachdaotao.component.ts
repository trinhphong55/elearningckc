import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

  private loadKHDT() {
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.monhocService.getMonHoc().subscribe(dsmonhoc => this.dsMonHoc = dsmonhoc);
    this.khdtService.getKHDTByHocKiNMaCTDT(this.maChuongTrinhDaoTao, "1").subscribe(dskhdt => this.dsKHDT = dskhdt);
  }

  private checkChange() {
    if (this.isChanged) {
      let a = confirm("Bạn đã thay đổi KHĐT, có muốn lưu không?");
      if (a) {
        this.saveKHDT();
      }
    }
  }

  selectBac() {
    this.checkChange();
    let maBac = parseInt(this.ctdt.maBac);
    this.nganhNgheService.getNganhNghebymaBac(maBac).subscribe(dsnn => {
      this.dsNganhNghe = dsnn;
      if (dsnn.length !== 0) {
        this.ctdt.maNganhNghe = dsnn[0].maNganhNghe;
      }
      this.loadKHDT();
    });
  }

  select() {
    this.checkChange();
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
    if (this.dsKHDT !== []) {
      this.dsKHDT.splice(index, 1);
      this.isChanged = true;
    }
  }

  selectMonHoc(index: number) {
    this.isChanged = true;
    this.dsKHDT[index].maDaoTao = this.dsKHDT[index].maChuongTrinhDaoTao + this.dsKHDT[index].maMonHoc;
  }

  saveKHDT() {
    this.khdtService.addDSKHDT(this.ctdt, this.dsKHDT, this.hocKi).subscribe(data => {
      // console.log(status);
      if (data.status === 200) {
        this.toastr.success(data.message, 'Thông báo', { timeOut: 3000 });
        this.isChanged = false;
      }
    })
  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.nganhNgheService.getNganhNghebymaBac(parseInt(this.ctdt.maBac)).subscribe(dsnn => this.dsNganhNghe = dsnn);
    this.loadKHDT();
  }

  constructor(
    private modalService: ModalService,
    private khdtService: KHDTService,
    private monhocService: MonhocService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private nganhNgheService: NganhNgheService,
    private toastr: ToastrService,) {

  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
