import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, from } from 'rxjs';
import * as XLSX from 'xlsx';
import { LopHocPhanService } from '../../../../services/lophocphan.service';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { LopHoc } from './../../../../interfaces/LopHoc.interface';
// Yasuo start
import { LopHocPhan } from './../../../../interfaces/lophocphan.interface';
import { SinhVien } from './../../../../interfaces/SinhVien.interface';
import { BacService } from './../../../../services/Bac.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { SinhVienService } from './../../../../services/sinh-vien.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

// Yasuo end

@Component({
  selector: 'app-modal-chitieudaotao',
  templateUrl: './modal-chitieudaotao.component.html',
  styleUrls: ['./modal-chitieudaotao.component.css'],
  providers: [LopHocPhanService],
})
export class ModalChitieudaotaoComponent implements OnInit {
  public loaiHinhList = [
    { maLoai: '1', tenLoai: 'Chính quy' },
    { maLoai: '2', tenLoai: 'Liên thông' },
  ];
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
  //Khai bao list
  public nganhList: any;
  public bacList: any;
  public nganhtamlist: any;
  //Khai bao Form
  addForm: FormGroup;

  chiTieuList = new FormArray([]);
  public dsLopFormArray = new FormArray([]);

  hocKiForm: FormGroup;
  taiKhoan: any;
  //khai bao trang thai
  public isBtnHocPhanDisplay = false;

  //Khai bao Array
  public lops = [];
  public lopHocs: any;
  public lopTams: LopHoc[];
  public lopHocPhans: LopHocPhan[];
  public dsLHPTam: LopHocPhan[];

  public soChiTieuTams: any;

  //Khai bao thong bao
  msg = '';
  public msgList = [];
  public resetResult;
  public soChiTieu: any[] = [];

  //Gan gia tri cho Objsect Lop
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
      nguoiTao: this.taiKhoan.email,
      nguoiChinhSua: this.taiKhoan.email,
      maBac: maBac,
      khoa: khoa,
    };
  };

  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopHocService: LopHocService,
    private lopHocPhanSerivce: LopHocPhanService,
    private SinhVienService: SinhVienService,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.taiKhoan = this.cookie.getAll();
    let date = new Date();
    this.addForm = new FormGroup({
      bac: new FormControl('', [Validators.required]),
      loaiHinhDaoTao: new FormControl('', [Validators.required]),
      khoa: new FormControl(date.getFullYear().toString().slice(2, 4), [
        Validators.required,
      ]),
    });
    this.layLopHocPhan();
    this.getNganhNghe();
    this.getbac();
    this.getLopHoc();
    this.hocKiForm = new FormGroup({
      hocKi: new FormControl(''),
    });
  }
  //Lay tat ca tu DB LOP HOC#######################################################
  getLopHoc() {
    this.lopHocService.getAll().subscribe(
      (lop) => {
        this.lopHocs = lop;
      },
      (err) => {
        this.toastr.error(err, 'Cảnh báo', {
          timeOut: 8000,
        });
      }
    );
  }
  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bacList = bac;
      },
      (error) => {
        this.toastr.error(error.message, 'Cảnh báo', {
          timeOut: 8000,
        });
      }
    );
  }
  getNganhNghe() {
    this.nganhngheservice.getNganhnghe().subscribe(
      (data) => {
        this.nganhList = data;
        // this.nganhtamlist = this.nganhList;
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
        this.toastr.error(error.message, 'Lỗi', {
          timeOut: 8000,
        });
      }
    );
  }

  //Lay ten BAC tu ma BAC##################################
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
      if (element.maBac == maBac) ten = element.tenBac;
    });
    return ten;
  }

  //Khai bao su kien click##################################

  onClickCreate() {
    if (
      !this.addForm.value.khoa ||
      !this.addForm.value.loaiHinhDaoTao ||
      !this.addForm.value.bac
    ) {
      this.msg = 'Vui lòng chọn đủ thông tin';
      this.toastr.warning(this.msg, 'Cảnh báo');
    } else {
      this.taoLopHoc();
      // this.msg = 'Danh sách lớp được tạo trong cơ sở dữ liệu';
      // this.toastr.success(this.msg, 'Thông báo');
    }
  }
  onClickResetLopHoc(maNganh: string, maBac: string) {
    this.deleteLopHoc(maNganh, maBac);
  }
  /**
   * XepLopTheoMaNganh
   */
  tenNganhXepLop: String;
  maNganhXepLop: string;
  public maNganh;
  public maBac;

  public onClickLopTheoNganh(maNganh: string, maBac: string) {
    this.maBac = maBac;
    this.maNganh = maNganh;
    let maTienTo = this.taoTienTo(
      maNganh,
      maBac,
      this.addForm.value.khoa,
      this.addForm.value.loaiHinhDaoTao
    );
    this.maNganhXepLop = maNganh;
    this.tenNganhXepLop = this.convertToTenNganh(maNganh);
    this.xepLoptheoMaNganh(maTienTo);
  }
  public onChangeLoaiHinhDaoTao() {
    this.loadNganh();
  }
  public onChangeKhoaHoc() {
    this.loadNganh();
    this.lopTams = [];
  }
  //bắt sự kiện show môn theo ngành
  changed() {
    this.loadNganh();
  }
  loadNganh() {
    this.nganhtamlist = [];
    if (
      this.addForm.value.bac &&
      this.addForm.value.khoa &&
      this.addForm.value.loaiHinhDaoTao
    ) {
      this.layChiTieuTuTienTo();
      this.nganhList.forEach((element) => {
        if (element.maBac == this.addForm.value.bac) {
          this.nganhtamlist.push(element);
        }
      });
    }
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  onClickThemDSSV(maLop: string) {
    this.maLopThem = maLop;
  }
  onChangeSinhVien(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>evt.target;
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (this.isExcelFile == false) {
      this.removeData();
      this.toastr.warning('Đây không phải là file .xls hoặc .xlsx', 'Cảnh báo');
    }
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }

    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
        if (
          typeof data[0].maSinhVien == 'undefined' ||
          typeof data[0].ho == 'undefined' ||
          typeof data[0].ten == 'undefined' ||
          typeof data[0].ngaySinh == 'undefined'
        ) {
          this.removeData();
          this.toastr.warning('Cấu trúc file sai, vui lòng kiểm tra lại', 'Cảnh báo');
        } else {
          this.dsSinhVien = data;
        }
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);

        this.dataSheet.next(data);
      };
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }

  //################################################################################
  kiemtraTonTaiLopHoc(maNganh: string, maBac: string) {
    let ma = this.taoTienTo(
      maNganh,
      maBac,
      this.addForm.value.khoa,
      this.addForm.value.loaiHinhDaoTao
    );
    this.lopHocService.filterLopTheoTienTo(ma).subscribe((data) => {
      let dataArray = data;
      if (dataArray.count) {
        if (dataArray.count > 0) {
          this.toastr.warning(
            `Chỉ tiêu ${this.convertToTenBac(maBac)} "${this.convertToTenNganh(
              maNganh
            )} " khóa 20${this.addForm.value.khoa}  ` +
              ' đã tồn tại danh sách lớp',
            'Cảnh báo',
            { timeOut: 5000 }
          );
        }
      }
    });
  }
  public layChiTieuTuTienTo() {
    this.soChiTieu = [];
    let khoa = this.addForm.value.khoa;
    let loaiHinhDaoTao = this.addForm.value.loaiHinhDaoTao;
    this.chiTieuList.value.forEach((el) => {
      let maTienTo = this.taoTienTo(el.maNganh, el.maBac, khoa, loaiHinhDaoTao);
      this.layChiTieu(maTienTo);
    });
  }
  public layChiTieu(maTienTo: String) {
    this.lopHocService.filterLopTheoTienTo(maTienTo).subscribe((res) => {
      this.soChiTieu.push(res);
      this.soChiTieuTams = this.soChiTieu.map((el) => el);
      this.setChiTieuTheoTienTo();
    });
  }

  public setChiTieuTheoTienTo() {
    let loai = this.addForm.value.loaiHinhDaoTao;
    let khoa = this.addForm.value.khoa;

    if (this.soChiTieuTams) {
      this.soChiTieuTams.forEach((el) => {
        this.chiTieuList.controls.forEach((element) => {
          let maBac = element.get('maBac').value;
          let maNganh = element.get('maNganh').value;
          let maHople = this.taoTienTo(maNganh, maBac, khoa, loai);
          if (el.tienTo == maHople) {
            element.get('soChiTieu').setValue(el.count);
          }
        });
      });
    }

    //this.chiTieuList.get("soChiTieu").setValue(2);
  }
  public xepLoptheoMaNganh(tienTo: string) {
    let LopTam = [];
    this.lopHocs.forEach((element) => {
      let maLopTienTo = element.maLopHoc.slice(0, 7);
      if (maLopTienTo === tienTo) LopTam.push(element);
    });
    this.lopTams = LopTam;
    // this.getSiSo();
  }

  private getMaNTenLopHoc(): Object[] {
    let arrMaNTen = [];
    this.lopTams.forEach((lop) => {
      let temp = { tenVietTat: lop.tenVietTat, maLopHoc: lop.maLopHoc };
      arrMaNTen.push(temp);
    });
    return arrMaNTen;
  }

  generateLopHocPhan(): void {
    if (this.hocKiForm.value.hocKi === '') {
      this.toastr.error('Lỗi', 'Nhắc nhở', {
        timeOut: 8000,
      });
      return;
    }
    let hocKi = this.hocKiForm.value.hocKi;
    let dsMaNTen: Object[] = this.getMaNTenLopHoc();
    if (dsMaNTen.length === 0) {
      this.toastr.warning('Chưa có', 'Nhắc nhở', {
        timeOut: 8000,
      });
      return;
    }
    this.lopHocPhanSerivce
      .addDSLopHocPhan(dsMaNTen, hocKi)
      .subscribe((status) => {
        if (status.success) {
          this.toastr.success(status.success, 'Thông báo', {
            timeOut: 8000,
          });
        } else if (status.error) {
          this.toastr.error(status.error, 'Lỗi', {
            timeOut: 8000,
          });
        } else
          this.toastr.warning('Không có gì thay đổi', 'Nhắc nhở', {
            timeOut: 8000,
          });
      });
  }

  public layLopHocPhan() {
    this.lopHocPhanSerivce.getLopHocPhan().subscribe(
      (res) => {
        this.lopHocPhans = res;
        this.dsLHPTam = res;
      },
      (err) => {
        this.toastr.warning(err.message, 'Lỗi', {
          timeOut: 8000,
        });
      }
    );
  }
  public dsLHP: LopHocPhan[] = [];

  public onClickLayLopHocPhan_theoMaLop(maLop) {
    let dsTmp = [];
    this.lopHocPhans.forEach((el) => {
      if (el.maLopHoc == maLop) {
        dsTmp.push(el);
      }
    });
    this.dsLHP = dsTmp;
    this.dsLHPTam = dsTmp;
  }
  public onChangeLopHocPhan_theoHocKi() {
    let dsTmp = [];
    this.dsLHP.forEach((el) => {
      if (el.hocKi == this.hocKiForm.get('hocKi').value) {
        dsTmp.push(el);
      }
    });
    this.dsLHPTam = dsTmp;
  }
  public taoTienTo(maNganh, maBac, khoa, loaiHinhDaoTao) {
    return Number.parseInt(maBac) + '' + maNganh + '' + khoa + loaiHinhDaoTao;
  }
  public taoLopHoc() {
    this.chiTieuList.value.forEach((el) => {
      let len = el.soChiTieu;

      //let maCT = this.taoTienTo(el.maNganh,el.maBac, this.addForm.value.khoa,this.addForm.value.loaiHinhDaoTao);
      this.nganhtamlist.forEach((element) => {
        if (el.maNganh == element.maNganhNghe) {
          if (el.soChiTieu > 0) {
            this.kiemtraTonTaiLopHoc(el.maNganh, el.maBac);
          }
          for (let i = 0; i < len; i++) {
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
            var tenDayDu =
              this.convertToTenBac(el.maBac) +
              ' ' +
              this.convertToTenNganh(el.maNganh) +
              ' ' +
              '20' +
              this.addForm.value.khoa +
              String.fromCharCode(97 + i).toUpperCase();

            this.addLopHoc(
              this.setLop(
                el.maNganh,
                maLop,
                tenDayDu,
                tenLop,
                'facebook.com',
                el.maBac,
                this.addForm.value.khoa
              )
            );
          }
        }
      });
      // Bac + Nganh + Khóa  + STT
    });

    this.lopTams = [];
  }
  deleteLopHoc(maNganh: string, maBac: string) {
    let ma = this.taoTienTo(
      maNganh,
      maBac,
      this.addForm.value.khoa,
      this.addForm.value.loaiHinhDaoTao
    );
    this.lopHocService.xoaTheoTienTo(ma).subscribe(
      (data: any) => {
        //this.xepLoptheoMaNganh(ma);

        this.toastr.warning(data.msg, 'Nhắc nhở', { timeOut: 8000 });
        this.getLopHoc();
        this.lopTams = [];
        this.layChiTieuTuTienTo();
        this.setChiTieuTheoTienTo();
      },
      (error) => {
        this.toastr.error(error.message, 'Cảnh cáo', { timeOut: 8000 });
      }
    );
  }
  //Thao tac voi servce################################################################
  addLopHoc(data) {
    this.lopHocService.create(data).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success(res.msg, 'Thông báo', { timeOut: 8000 });
          this.getLopHoc();
        }
      },
      (err) => {
        this.toastr.error(err.message, 'Cảnh cáo', { timeOut: 8000 });
        //this.msgList.push(err);
      }
    );
  }
  ///Import Excel SinhVien
  spinnerEnabled = false;
  keys: string[];
  dsSinhVien: SinhVien[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  maLopThem: string;

  convertToMaLopHopLe(sv: String) {
    //030061711 => 0306171
    return 0 + sv.slice(0, 1) + sv.slice(2, 7);
  }
  public dsSinhVienThemThatBai: SinhVien[] = [];
  public xoaSinhVien_tuDanhSachExcel(index) {
    this.dsSinhVien.splice(index, 1);
  }
  public xoaSinhVien_tuDanhSachThatBai(index) {
    this.dsSinhVienThemThatBai.splice(index, 1);
    this.dsLopFormArray.value.splice(index, 1);
  }
  public capNhat_LopChoSinhVien() {
    let index = 0;
    this.toastr.clear();
    this.dsLopFormArray.value.forEach((sv) => {
      this.SinhVienService.capNhatSinhVien(sv).subscribe(
        (res: any) => {
          index++;
          this.lopTams = [];
          if (index == this.dsLopFormArray.value.length) {
            this.getLopHoc();
            this.toastr.success('Cập nhật thành công sinh viên', 'Thông báo', {
              timeOut: 3000,
            });
          }
        },
        (err) => {
          // this.toastr.error(err.message, 'Lỗi');
        }
      );
    });
  }
  public soSinhVienthemThanhCong = 0;
  public soSinhVienthemThatBai = 0;

  dsLopIndex = -1;
  private importExcel() {
    this.dsSinhVienThemThatBai = [];
    this.soSinhVienthemThanhCong = 0;
    this.soSinhVienthemThatBai = 0;
    this.dsLopFormArray.clear();
    let index = 0;
    this.dsSinhVien.forEach((sv) => {
      sv.nguoiChinhSua = this.taiKhoan.email;
      sv.nguoiTao = this.taiKhoan.email;
      sv.maLopHoc = this.maLopThem;
      index++;
    });
    this.SinhVienService.themSinhVien(this.dsSinhVien).subscribe(
      (response: any) => {
        this.dsSinhVienThemThatBai = response.dsSinhVienThatBai;

        this.dsSinhVienThemThatBai.forEach((el: any) => {
          this.dsLopFormArray.push(
            new FormGroup({
              maLopHoc: new FormControl(el.data.maLopHoc),
              maSinhVien: new FormControl(el.data.maSinhVien),
              role: new FormControl(this.taiKhoan.role),
            })
          );
        });
        this.soSinhVienthemThatBai = response.soSinhVienThemThatBai;
        this.soSinhVienthemThanhCong = response.soSinhVienThemThanhCong;

        if (this.soSinhVienthemThatBai > 0) {
          this.toastr.warning(
            'Tổng sinh viên thêm thất bại: ' + this.soSinhVienthemThatBai,
            'Thông báo',
            { timeOut: 120000 }
          );
        }
        this.toastr.success(
          'Tổng sinh viên thêm thành công: ' + this.soSinhVienthemThanhCong,
          'Thông báo',
          { timeOut: 120000 }
        );

        this.lopTams = [];
      },
      (error: any) => {}
    );

    this.capNhat_SLSinhVien_LopHocPhan(this.maLopThem);
  }

  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    this.dsSinhVien = undefined;
  }
  public onClickImportExeclSinhVien() {
    this.msgList = [];
    if (this.dsSinhVien) {
      this.importExcel();
      // this.getSiSo();
      this.getLopHoc();
    } else {
      this.toastr.warning(
        'Danh sách sinh viên trống, không có sinh viên nào được thêm vào',
        'Cảnh báo'
      );
    }
  }

  public capNhat_SLSinhVien_LopHocPhan(maLopHoc) {
    this.SinhVienService.capNhatSiSoLopHocPhan(maLopHoc).subscribe((res) => {
      this.getLopHoc();
    });
  }
}
