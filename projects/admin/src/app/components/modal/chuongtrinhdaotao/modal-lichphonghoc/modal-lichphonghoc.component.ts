import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

//Services
import { LHDTService } from '../../../../services/loaihinhdaotao.service';
import { BacService } from '../../../../services/Bac.service';
import { FileService } from '../../../../../../../elearning/src/app/services/file.service';
import { PhonghocService } from '../../../../services/phonghoc.service';
import { LichPhongHocService } from '../../../../services/lichphonghoc.service';

//interfaces
import { LHDT } from '../../../../interfaces/loaihinhdaotao.interface';
import { bac } from '../../../../interfaces/Bac.interface';
import { PhongHoc } from '../../../../interfaces/PhongHoc.interface';
import { LPH } from '../../../../interfaces/LichPhongHoc.interface';

@Component({
  selector: 'app-modal-lichphonghoc',
  templateUrl: './modal-lichphonghoc.component.html',
  styleUrls: ['./modal-lichphonghoc.component.css']
})
export class ModalLichphonghocComponent implements OnInit {

  dsLoaiHinhDaoTao: LHDT[];
  dsBac: bac[];


  dsLPH: LPH[];

  khoa = "17";
  maBac = "3";
  tongTuan = 52;
  tuanDau = 1;
  tuanCuoi = 52;
  titleLPH = "Lịch phòng học Cao đẳng các ngành đào tạo học kì 1 năm học 2019 - 2020";
  dsTuan: string[] = [];
  dsNamHoc: object[] = [];
  display = false;

  dsPhong: PhongHoc[];

  private loadLPH() {
    // this.lichPhongHocService.getbymaBacNkhoa(this.maBac, this.khoa).subscribe(
    //   dslph => {
    //     this.dsLPH = dslph;
    //     // console.log(dslph);
    //     if (dslph.length !== 0) {
    //       this.display = true
    //     } else {
    //       this.display = false;
    //     }
    //   },
    //   error => console.log(error));

    // for (let i = this.tuanDau; i <= 5; i++) {
    //   this.dsTuan.push(`Tuần ${i}`)
    // }
  }

  select() {
    this.loadLPH();
  }

  selectPhongHoc(maPhong: string, sttTuan: number, sttLop: number) {
    if (maPhong !== "") {
      for (let i = sttTuan + 1; i < this.tongTuan; i++) {
        if (this.dsLPH[sttLop].lichHoc[i] === "") {
          this.dsLPH[sttLop].lichHoc[i] = maPhong;
        }
      }
    }
  }

  saveLPH() {
    console.log('haha');
    // this.lichPhongHocService.addLPH(this.dsLPH).subscribe(res => {
    //   if (res.status === 200) {
    //     alert('Cap nhat thanh cong');
    //   } else {
    //     alert('Cap nhat that bai');
    //   }
    // })
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

  constructor(
    private modalService: ModalService,
    private lhdtService: LHDTService,
    private bacService: BacService,
    private phongHocService: PhonghocService,
    private fileService: FileService,
    private lichPhongHocService: LichPhongHocService) {

  }

  ngOnInit(): void {
    this.bacService.getBac().subscribe(dsbac => this.dsBac = dsbac);
    this.lhdtService.getLHDT().subscribe(dslhdt => this.dsLoaiHinhDaoTao = dslhdt);
    this.phongHocService.getPhongHoc().subscribe(dsphong => {
      this.dsPhong = dsphong;
    }, error => console.log(error));
    this.loadLPH();
  }
}
