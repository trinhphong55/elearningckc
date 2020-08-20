import { LopHocService } from './../../services/lop-hoc.service';
import { ThoiKhoaBieu } from './../../models/thoi-khoa-bieu.interface';
import { ThoiKhoaBieuService } from './../../services/thoi-khoa-bieu.service';
import { ChuDe } from './../../models/chu-de.interface';
import { ChuDeService } from './../../services/chu-de.service';
import { MonhocService } from './../../services/monhoc.service';
import { KHDT_DiemSinVien } from '../../models/khdt_diemsv.interface';
import { KHDTService } from '../../services/khdt_diemsinhvien.service';
import { SinhVien } from './../../models/SinhVien.interface';
import { DiemSinhVien } from './../../models/diemsv.interface';
import { DiemSinhVienService } from './../../../../../admin/src/app/services/diem-sinh-vien.service';
import { CotDiemSinhVienLopHocPhanService } from './../../services/cotdiem-sinhvien-lophocphan.service';
import { CotDiemSinhVienLopHocPhan } from './../../models/CotDiemSinhVienLopHocPhan.interface';
import { LopHocPhanService } from './../../services/lophocphan.service';
import { ChiTietDiemSVLHP } from './../../models/ChiTietDiemSVLHP.interface';
import { CtDiemsvLhpService } from './../../services/ct-diemsv-lhp.service';
import { SinhVienService } from './../../services/sinh-vien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LopHocPhan } from '../../models/lophocphan.interface';
import { MonHoc } from '../../models/monhoc.interface';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-trangcanhansv',
  templateUrl: './page-trangcanhansv.component.html',
  styleUrls: ['./page-trangcanhansv.component.css'],
})
export class PageTrangcanhansvComponent implements OnInit {
  public taiKhoan: any;
  public sinhVien: SinhVien;
  public sinhViens: SinhVien[] = [];

  public ctDiemLHP: ChiTietDiemSVLHP;
  public ctDiemLHPs: ChiTietDiemSVLHP[] = [];
  public ctDiemLHPsTmp: ChiTietDiemSVLHP[] = [];

  public lopHocPhan: LopHocPhan;
  public lopHocPhans: LopHocPhan[] = [];

  public cotDiems: CotDiemSinhVienLopHocPhan[] = [];
  public dsChuDe: ChuDe[] = [];
  public diemSinhViens: DiemSinhVien[] = [];
  public dsKHDT: KHDT_DiemSinVien[] = [];
  public dsMonHoc: MonHoc[] = [];
  public MonHoc: MonHoc;
  public dsThoiKhoaBieu: ThoiKhoaBieu;

  public sinhVienFormGroup: FormGroup;
  public locChiTietGroupForm: FormGroup;
  public locBangDiemFormGroup: FormGroup;

  public messages = [];

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
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private sinhVienService: SinhVienService,
    private ctDiemsvLhpService: CtDiemsvLhpService,
    private LopHocPhanService: LopHocPhanService,
    private cotDiemService: CotDiemSinhVienLopHocPhanService,
    private diemSinhVienService: DiemSinhVienService,
    private kHDTService: KHDTService,
    private monHocService: MonhocService,
    private chuDeService: ChuDeService,
    private thoiKhoaBieu: ThoiKhoaBieuService,
    private lophocService: LopHocService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setTaiKhoan();
    this.layThongTinSV(this.taiKhoan.displayName);
    this.layDiemSinhVien(this.taiKhoan.displayName);
    this.layCTDiemLHP(this.taiKhoan.displayName);

    this.sinhVienFormGroup = new FormGroup({
      mssv: new FormControl({ value: '', disabled: true }),
      gioiTinh: new FormControl({ value: '', disabled: true }),
      ho: new FormControl({ value: '', disabled: true }),
      ten: new FormControl({ value: '', disabled: true }),
      email: new FormControl({ value: '', disabled: true }),
      ngaySinh: new FormControl({ value: '', disabled: true }),
      sdt: new FormControl(''),
      password: new FormControl(''),
      cofirmPassword: new FormControl(''),
    });
    this.locChiTietGroupForm = new FormGroup({
      chonLop: new FormControl(''),
      chonHocKi: new FormControl(''),
    });
    this.locBangDiemFormGroup = new FormGroup({
      chonLop: new FormControl(''),
      chonHocKi: new FormControl(''),
    });
  }
  get mssv() {
    return this.sinhVienFormGroup.get('mssv');
  }
  get gioiTinh() {
    return this.sinhVienFormGroup.get('gioiTinh');
  }
  get ho() {
    return this.sinhVienFormGroup.get('ho');
  }
  get ten() {
    return this.sinhVienFormGroup.get('ten');
  }
  get email() {
    return this.sinhVienFormGroup.get('email');
  }
  get ngaySinh() {
    return this.sinhVienFormGroup.get('ngaySinh');
  }
  get sdt() {
    return this.sinhVienFormGroup.get('sdt');
  }
  get password() {
    return this.sinhVienFormGroup.get('password');
  }
  get confirmPassword() {
    return this.sinhVienFormGroup.get('cofirmPassword');
  }
  get chonHocKi() {
    return this.locChiTietGroupForm.get('chonHocKi');
  }
  get chonLop() {
    return this.locChiTietGroupForm.get('chonLop');
  }
  get chonHocKiBD() {
    return this.locBangDiemFormGroup.get('chonHocKi');
  }
  get chonLopBD() {
    return this.locBangDiemFormGroup.get('chonLop');
  }
  //######################### Lay Thong Tin ##########################
  public setTaiKhoan() {
    this.taiKhoan = this.cookieService.getAll();
    this.taiKhoan.displayName = this.cookieService.get('email').slice(0, 10);
  }
  public layThongTinSV(maSV: string) {
    this.sinhVienService.getonesv(maSV).subscribe(
      (sv) => {
        if (sv.data) {
          this.sinhVien = sv.data;
          let maCT = this.sinhVien.maLopHoc.slice(0, 7);
          this.layCTDT_theoHocKi(this.chonHocKiBD.value, maCT);
          this.layThoiKhoaBieu_theoLop(this.sinhVien.maLopHoc, 1);
          this.setValueSinhVienFormGroup(this.sinhVien);
          this.lophocService
            .get(this.sinhVien.maLopHoc)
            .subscribe((res: any) => {
              this.sinhVien.tenLopHoc = res.tenLop;
            });
          this.sinhViens.push(this.sinhVien);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public capNhatSinhVien(data) {
    this.messages = [];
    this.sinhVienService.capNhatSinhVien(data).subscribe(
      (res: any) => {
        if (res.status == 200) this.toastr.success(res.message, 'Thông báo');
        else {
          this.toastr.warning(res.message, 'Cảnh báo');
        }
      },
      (err: any) => {
        this.toastr.error('Máy chủ không sử lý được', 'Lỗi');
      }
    );
  }
  public layCTDiemLHP(maSv: string) {
    this.ctDiemsvLhpService.layCTtheoMaSV(maSv).subscribe((res: any) => {
      if (res.data) {
        this.ctDiemLHPs = [];
        this.ctDiemLHPsTmp = res.data;
        this.ctDiemLHPs = this.ctDiemLHPsTmp;
        this.ganTenLopHocPhanCTDiem();
        // this.ctDiemLHPs = this.loc_CTDiem_LopHocPhan(this.ctDiemLHPsTmp);
      }
    });
  }

  public layDiemSinhVien(maSinhVien: string) {
    this.diemSinhVienService.getAllFor(maSinhVien).subscribe(
      (res: any) => {
        if (res.data) {
          this.diemSinhViens = res.data;
          this.ganTenLopHocPhanDiemSV(this.diemSinhViens);
        }
      },
      (err) => console.log(err)
    );
  }
  public setValueSinhVienFormGroup(sinhVien: SinhVien) {
    this.mssv.setValue(sinhVien.maSinhVien);
    this.gioiTinh.setValue(sinhVien.gioiTinh == 0 ? 'Nam' : 'Nữ');
    this.ho.setValue(sinhVien.ho);
    this.ten.setValue(sinhVien.ten);
    this.ngaySinh.setValue(sinhVien.ngaySinh);
    // this.password.setValue(sinhVien.matKhau);
    this.sdt.setValue(sinhVien.sdt);
    this.email.setValue(sinhVien.email);
  }
  public layLopHocPhanTheoMaLHP(maLopHocPhan) {
    this.LopHocPhanService.layLopHocPhanTheoMaLHP(maLopHocPhan).subscribe(
      (res) => {
        if (res.data) {
          this.lopHocPhan = res.data;
          this.lopHocPhans.push(this.lopHocPhan);
        }
      }
    );
  }
  public layCTDT_theoHocKi(hocKi, maCTDT) {
    if (hocKi) {
      this.kHDTService
        .getKHDTByHocKiNMaCTDT(maCTDT, hocKi)
        .subscribe((res: any) => {
          this.dsKHDT = res;

          this.dsKHDT.forEach((khdt) => {
            this.diemSinhViens.forEach((diem) => {
              if (diem.maDaoTao == khdt.maDaoTao) {
                khdt.diemSinhVien = diem;
              }
            });
            this.monHocService
              .getMonHocFromMaMonHoc(khdt.maMonHoc)
              .subscribe((res: any) => {
                khdt.tenMonHoc = res.tenMonHoc;
              });
          });
        });
    } else {
      this.dsKHDT = [];
    }
  }
  public layThoiKhoaBieu_theoLop(maLopHoc, hocKi) {
    this.thoiKhoaBieu.layThoiKhoaBieu(maLopHoc, hocKi).subscribe(
      (res: any) => {
        this.dsThoiKhoaBieu = res;
        this.layMonHoc_tuMaMonHoc(this.dsThoiKhoaBieu.TKB);
      },
      (err) => console.log(err)
    );
  }
  public layMonHoc_tuMaMonHoc(dsMaMonHoc) {
    this.monHocService.getMonHoc().subscribe((res: any) => {
      this.dsMonHoc = res;
      this.dsThoiKhoaBieu.TKB = [[]];
      this.dsThoiKhoaBieu.TKB.pop();
      dsMaMonHoc.forEach((el) => {
        let tiet_tmp = [];
        el.forEach((tiet) => {
          this.dsMonHoc.forEach((monhoc) => {
            if (tiet == monhoc.maMonHoc) {
              tiet = monhoc.tenMonHoc;
              tiet_tmp.push(tiet);
            }
          });
        });
        if (tiet_tmp.length < 6) {
          for (let i = 0; i < 6; i++) {
            if (tiet_tmp.length < 6) {
              tiet_tmp.push('trống');
            }
          }
        }
        if (tiet_tmp.length !== 0) {
          this.dsThoiKhoaBieu.TKB.push(tiet_tmp);
        }
      });
    });
  }
  //######################## gan Ten #################################
  public ganTenLopHocPhanDiemSV(diemSV: DiemSinhVien[]) {
    this.LopHocPhanService.getLopHocPhan().subscribe((res) => {
      if (res) {
        this.lopHocPhans = res;
        this.lopHocPhans = this.locMaLopHocPhanTheoHocKi(this.lopHocPhans);
        diemSV = this.loc_Theo_LopHocPhan(this.diemSinhViens);
        diemSV.forEach((ct) => {
          this.lopHocPhans.forEach((lop) => {
            if (ct.maLopHocPhan == lop.maLopHocPhan) {
              ct.tenLopHocPhan = lop.tenLopHocPhan;
            }
          });
        });
        this.diemSinhViens = diemSV;
      }
    });
  }
  public ganTenLopHocPhanCTDiem() {
    this.LopHocPhanService.getLopHocPhan().subscribe(
      (res) => {
        if (res) {
          this.lopHocPhans = res;
          //this.ctDiemLHPs = [];
          this.lopHocPhans = this.locMaLopHocPhanTheoHocKi(this.lopHocPhans);
        }
      },
      (err) => console.log(err)
    );
  }
  // public ganTenCotDiemCTDiem(ChiTiemDiems: ChiTietDiemSVLHP[]) {
  //   this.cotDiemService.layTatCa().subscribe((res: any) => {
  //     this.cotDiems = res;
  //     ChiTiemDiems.forEach((ct) => {
  //       this.cotDiems.forEach((lop) => {
  //         if (ct.maCotDiem == lop.maCotDiem) {
  //           ct.tenCotDiem = lop.tenCotDiem;
  //           ct.heSo = lop.heSo;
  //         }
  //       });
  //     });
  //   });
  // }

  //################################# Xu ly su kien ##################################
  onChangeDanhSachCotDiem() {
    this.layThongTinSV(this.taiKhoan.displayName);
    this.layCTDiemLHP(this.taiKhoan.displayName);
  }
  onChangeChonHocKi() {
    this.layThongTinSV(this.taiKhoan.displayName);
    this.layCTDiemLHP(this.taiKhoan.displayName);
    this.chonLop.setValue('');
  }
  onChangBangDiem() {
    this.chonHocKi.setValue('');
    this.layDiemSinhVien(this.taiKhoan.displayName);
    this.layThongTinSV(this.taiKhoan.displayName);
  }
  onSubmitCapNhatSinhVien() {
    this.messages = [];
    if (!this.password.value) {
      // this.messages.push({
      //   msg: 'Vui lòng nhập mật khẩu để thay đổi',
      //   status: 200,
      // });
      this.toastr.warning('Vui lòng nhập mật khẩu để thay đổi', 'Thông báo');
    } else if (this.password.value != '123456') {
      this.toastr.warning('Mật khẩu không trùng nhau', 'Thông báo');
      // this.messages.push({ msg: 'Mật khẩu không trùng nhau', status: 200 });
    } else {
      const req = {
        maSinhVien: this.sinhVien.maSinhVien,
        tokens: '12341234',
        role: this.taiKhoan.role,
        sdt: this.sdt.value,
        nguoiChinhSua: this.taiKhoan.displayName,
      };
      this.capNhatSinhVien(req);
    }
  }
  //################################ Xu ly loc #######################################
  public loc_CTDiem_LopHocPhan(ChiTietDiem) {
    if (this.chonLop.value && this.chonHocKi.value) {
      let tmp = ChiTietDiem;
      ChiTietDiem = [];
      tmp.forEach((ct) => {
        if (ct.maHocPhan == this.chonLop.value) {
          ChiTietDiem.push(ct);
        }
      });
    } else {
      return [];
    }
    return ChiTietDiem;
  }
  public locMaLopHocPhanTheoHocKi(lopHocPhans: LopHocPhan[]) {
    let tmp = lopHocPhans;
    lopHocPhans = [];
    if (this.chonHocKi.value) {
      tmp.forEach((ct) => {
        if (ct.hocKi == this.chonHocKi.value) {
          lopHocPhans.push(ct);
        }
      });
    } else if (this.chonHocKiBD.value) {
      tmp.forEach((ct) => {
        if (ct.hocKi == this.chonHocKiBD.value) {
          lopHocPhans.push(ct);
        }
      });
    }

    return lopHocPhans;
  }
  public loc_Theo_LopHocPhan(diemSV: any[]) {
    let diems = [];
    diemSV.forEach((diem) => {
      this.lopHocPhans.forEach((lop) => {
        if (diem.maLopHocPhan == lop.maLopHocPhan) {
          diems.push(diem);
        }
      });
    });
    return diems;
  }
}
