import { LopHocService } from './../../../../services/lop-hoc.service';
import { BacService } from './../../../../services/Bac.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';

@Component({
  selector: 'app-modal-chitieudaotao',
  templateUrl: './modal-chitieudaotao.component.html',
  styleUrls: ['./modal-chitieudaotao.component.css'],
})
export class ModalChitieudaotaoComponent implements OnInit {
  bacList: any;
  public loaiHinhList = [
    { maLoai: '1', tenLoai: 'Chính quy' },
    { maLoai: '2', tenLoai: 'Liên thông' },
  ];
  public nganhList: any;
  nganhtamlist: any;
  addForm: FormGroup;
  chiTieuGroup: FormGroup;
  chiTieuList = new FormArray([]);

  public hocKis = [
    {
      maHK: 1,
      tenHK: 'HK1',
    },
    {
      maHK: 2,
      tenHK: 'HK2',
    },
    {
      maHK: 3,
      tenHK: 'HK3',
    },
    {
      maHK: 4,
      tenHK: 'HK4',
    },
    {
      maHK: 5,
      tenHK: 'HK5',
    },
    {
      maHK: 6,
      tenHK: 'HK6',
    },
  ];
  public lops = [];
  public lopHocs: any;
  lopTams:any;

  hocKiForm: FormGroup;
  msg = '';
  public msgList = [];
  public resetResult;
  setLop = (
    maNganh,
    maLopHoc,
    tenLop,
    tenVietTat,
    linkFBLopHoc,
    maBac,
    khoa
  ) => {
    return {
      maNganh: maNganh,
      maLopHoc: maLopHoc,
      tenLop: tenLop,
      tenVietTat: tenVietTat,
      linkFBLopHoc: linkFBLopHoc,
      nguoiTao: 'TranDinhHuy',
      nguoiChinhSua: 'TranDinhHuy',
      maBac: maBac,
      khoa: khoa,
    };
  };

  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopHocService: LopHocService
  ) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      bac: new FormControl('', [Validators.required]),
      loaiHinhDaoTao: new FormControl('', [Validators.required]),
      khoa: new FormControl(17, [Validators.required]),
    });
    this.getNganhNghe();
    this.getbac();
    this.getLopHoc();
    this.hocKiForm = new FormGroup({
      hocKi: new FormControl(''),
    });


  }
  getLopHoc() {
    this.lopHocService.getAll().subscribe(
      (lop) => {
        this.lopHocs = lop;
        //this.lopTams = this.lopHocs;
      },
      (err) => (this.msg = err)
    );
  }
  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bacList = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNganhNghe() {
    this.nganhngheservice.getNgangnghe().subscribe(
      (data) => {
        this.chiTieuGroup = new FormGroup({
          maNganh: new FormControl(''),
          soChiTieu: new FormControl(''),
        });
        this.nganhList = data;
        this.nganhtamlist = this.nganhList;
        console.log(this.nganhList);
        this.nganhList.forEach((element) => {
          this.chiTieuList.push(
            new FormGroup({
              maBac: new FormControl(element.maBac),
              maNganh: new FormControl(element.maNganhNghe),
              tenVietTat: new FormControl(element.tenVietTat),
              soChiTieu: new FormControl(''),
            })
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  convertToTenBacVietTat(maBac: string) {
    let ten = 'TKT';
    this.bacList.forEach((element) => {
      if (element.maBac == maBac) ten = element.tenVietTat;
    });
    return ten;
  }
  convertTenNganhVietTat(maNganh: string) {
    let ten = 'TKT';
    this.nganhList.forEach((element) => {
      if (element.maNganhNghe == maNganh) ten = element.tenVietTat;
    });
    return ten;
  }
  convertToTenNganh(maNganh: string) {
    let ten = 'TKT';
    this.nganhList.forEach((element) => {
      if (element.maNganhNghe == maNganh) ten = element.tenNganhNghe;
    });
    return ten;
  }
  convertToTenBac(maBac: string) {
    let ten = 'TKT';
    this.bacList.forEach((element) => {
      if (element.maBac == maBac) ten = element.tenVietTat;
    });
    return ten;
  }

  addLopHoc(data) {
    this.lopHocService.create(data).subscribe(
      (res) => {
        // let { msg, status} = res;
        //this.msgList.push(data.tenLop);
      },
      (err) => {
        //this.msgList.push(err);
      }
    );
  }
  onClickCreate() {
    if (!this.addForm.value.khoa || !this.addForm.value.loaiHinhDaoTao) {
      this.msg = 'Vui lòng chọn Loại hình đào tạo và nhập khóa học';
    } else {
      this.createClassModal();
      this.msg = 'Danh sách lớp được tạo trong cơ sở dữ liệu';
    }
  }
  deleteLopHoc(maNganh: string) {
    this.lopHocService.deleteMaNganh(maNganh).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  resetLopHoc(maNganh: string) {
    this.lopHocService.getAllFor(maNganh).subscribe((data) => {
      console.log(data);
      if (data > 0) {
        this.msgList.push({
          msg:
            `Ngành "${this.convertToTenNganh(maNganh)} "` +
            ' đã tồn tại danh sách lớp, Bạn có muốn tạo danh sách mới không ? ',
          trangThai: true,
          maNganh: maNganh,
        });
      } else {
        this.msgList.push({
          msg:
            `Ngành "${this.convertToTenNganh(maNganh)}"` +
            ' đã tạo danh sách lớp thànhh công ',
          trangThai: false,
          maNganh: maNganh,
        });
      }
    });
  }
  onClickLopHocPhan() {
    console.log(this.hocKiForm.value.hocKi);
    console.log(this.addForm.value.bac);
  }
  onClickResetLopHoc(maNganh: string) {
    this.deleteLopHoc(maNganh);
    this.createClassModal();
    this.getLopHoc();

  }
  /**
   * XepLopTheoMaNganh
   */
  public onClickLopTheoNganh(maNganh:string){
    console.log(this.lopHocs);
    this.getLopHoc();
    this.xepLoptheoMaNganh(maNganh);
    console.log(this.lopHocs);

  }
  public xepLoptheoMaNganh(maNganh:string) {

    let LopTam = [];
    this.lopHocs.forEach(element => {
      console.log(maNganh);
      if(element.maNganh === maNganh)
        LopTam.push(element);
    });
    this.lopTams = LopTam;

  }

  public createClassModal() {
    let index = 1;
    this.chiTieuList.value.forEach((el) => {
      let len = el.soChiTieu;
      if (el.soChiTieu > 0) {
        this.resetLopHoc(el.maNganh);
      }
      // Bac + Nganh + Khóa  + STT
      for (let i = 0; i < len; i++) {
        index++;
        var tenLop =
          this.convertToTenBacVietTat(el.maBac) +
          ' ' +
          this.convertTenNganhVietTat(el.maNganh) +
          ' ' +
          this.addForm.value.khoa +
          String.fromCharCode(97 + i).toUpperCase();
        var maLop =
          Number.parseInt(el.maBac) +
          '' +
          el.maNganh +
          '' +
          this.addForm.value.khoa +
          this.addForm.value.loaiHinhDaoTao +
          (i + 1);
        this.lops.push(tenLop);
        this.addLopHoc(
          this.setLop(
            el.maNganh,
            maLop,
            tenLop,
            tenLop,
            'facebook.com',
            el.maBac,
            this.addForm.value.khoa
          )
        );
      }

      this.lops = [];

    });

    this.msgList = [];
  }
  //bắt sự kiện show môn theo ngành
  changed(e) {
    //  this.nganhList.array.forEach(element => {
    //    this
    //  });
    this.nganhtamlist = [];
    if (this.addForm.value.bac !== '') {
      this.nganhList.forEach((element) => {
        if (element.maBac == this.addForm.value.bac) {
          this.nganhtamlist.push(element);
        }
      });
    } else {
      this.nganhtamlist = this.nganhList;
    }
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
