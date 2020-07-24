import { Component, OnInit } from '@angular/core';

//Services
import { ModalService } from '../../../../services/modal.service';
import { KHDTService } from '../../../../services/khdt.service';
import { MonhocService } from '../../../../services/monhoc.service';
import { CTDTService } from '../../../../services/ctdt.service';
//interfaces
import { KHDT } from '../../../../interfaces/khdt.interface';
import { MonHoc } from '../../../../interfaces/monhoc.interface';
import { CTDT } from '../../../../interfaces/ctdt.interface';

@Component({
  selector: 'app-modal-kehoachdaotao',
  templateUrl: './modal-kehoachdaotao.component.html',
  styleUrls: ['./modal-kehoachdaotao.component.css'],
  providers: [KHDTService, MonhocService]
})
export class ModalKehoachdaotaoComponent implements OnInit {

  dsKHDT: KHDT[];
  dsMonHoc: MonHoc[];
  hocKi = "1";
  isChanged = false;
  private maChuongTrinhDaoTao: string;

  dsBac = [
    { maBac: "03", tenBac: "Cao đẳng" },
    { maBac: "02", tenBac: "Cao đẳng nghề" },
    { maBac: "05", tenBac: "Đại học" },
  ];

  dsLoaiHinhDaoTao = [
    { maLoaiHinhDaoTao: "1", tenLoaiHinhDaoTao: "Chính quy" },
    { maLoaiHinhDaoTao: "2", tenLoaiHinhDaoTao: "Liên thông" },
  ];

  dsNganhNghe = [
    { maNganhNghe: "01", tenNganhNghe: "Cơ khí" },
    { maNganhNghe: "06", tenNganhNghe: "Công nghệ thông tin" },
  ];

  ctdt: CTDT = {
    maBac: this.dsBac[0].maBac,
    maNganhNghe: this.dsNganhNghe[0].maNganhNghe,
    khoaHoc: "20",
    maLoaiHinhDaoTao: this.dsLoaiHinhDaoTao[0].maLoaiHinhDaoTao,
  };

  private convertToMaChuongTrinhDaoTao(item: CTDT): string {
    return item.maBac + item.maNganhNghe + item.khoaHoc + item.maLoaiHinhDaoTao;
  }

  select() {
    if (this.isChanged) {
      let a = confirm("may da thay doi, co muon luu khong?");
      if (a) {
        this.isChanged = false;
        this.saveKHDT();
      }
    }
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.khdtService.getKHDTByHocKiNMaCTDT(this.maChuongTrinhDaoTao, this.hocKi)
    .subscribe(dskhdt => this.dsKHDT = dskhdt);
  }

  addNewKHDT() {
    this.isChanged = true;
    let newKHDT: KHDT = {
      hocKi: parseInt(this.hocKi), maChuongTrinhDaoTao: this.maChuongTrinhDaoTao,
      maBoMon: "001", maDaoTao: this.maChuongTrinhDaoTao + this.dsMonHoc[0].maMonHoc,
      donViHocTrinh: 15, soTietHoc: 45, soTuan: 15, maMonHoc: this.dsMonHoc[0].maMonHoc,
      loaiTienThu: 'Module', tinh: false, xet: false,
    };
    this.dsKHDT.push(newKHDT);
    console.log(this.dsKHDT);
  }

  removeKHDT(index: number) {
    if (this.dsKHDT !== []){
      this.dsKHDT.splice(index,1);
    }
  }

  selectMonHoc(index: number) {
    this.isChanged = true;
    this.dsKHDT[index].maDaoTao = this.dsKHDT[index].maChuongTrinhDaoTao + this.dsKHDT[index].maMonHoc;
  }

  saveKHDT() {
    this.khdtService.addDSKHDT(this.ctdt, this.dsKHDT).subscribe(status => {
      console.log(status);
      if (status.success) {
        alert(status.success);
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
    this.maChuongTrinhDaoTao = this.convertToMaChuongTrinhDaoTao(this.ctdt);
    this.monhocService.getMonHoc().subscribe(dsmonhoc => this.dsMonHoc = dsmonhoc);
    this.khdtService.getKHDTByHocKiNMaCTDT(this.maChuongTrinhDaoTao,"1").subscribe(dskhdt => this.dsKHDT = dskhdt);
  }

  constructor(
    private modalService: ModalService,
    private khdtService: KHDTService,
    private monhocService: MonhocService,
    private ctdtService: CTDTService,) {}

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
