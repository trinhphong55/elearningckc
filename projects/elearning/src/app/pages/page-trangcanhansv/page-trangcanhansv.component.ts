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
  public lopHocPhansTmp: LopHocPhan[] = [];

  public cotDiems: CotDiemSinhVienLopHocPhan[] = [];
  public dsChuDe: ChuDe[] = [];
  public diemSinhViens: DiemSinhVien[] = [];
  public diemSinhViensTmp: DiemSinhVien[] = [];
  public dsKHDT: KHDT_DiemSinVien[] = [];
  public dsKHDTTmp: KHDT_DiemSinVien[] = [];
  public dsTatCaKHDT: any[] = [];
  public dsTatCaKHDTTmp: any[] = [];

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
  public hocKiTam = this.hocKis;
  public chonTKB = new FormControl('');

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
          this.layCTDT_theoHocKi(this.sinhVien.maSinhVien);

          this.layThoiKhoaBieu_theoLop(this.sinhVien.maLopHoc, 1);

          this.setValueSinhVienFormGroup(this.sinhVien);
          this.layLopHocPhan(this.sinhVien.maLopHoc);
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
        if (err.status == 403) {
          this.toastr.error(err.error.message, 'Lỗi');
        }
      }
    );
  }
  public layCTDiemLHP(maSv: string) {
    this.ctDiemsvLhpService.layCTtheoMaSV(maSv).subscribe((res: any) => {
      if (res.data) {
        this.ctDiemLHPs = [];
        this.ctDiemLHPsTmp = res.data;
        this.ctDiemLHPs = this.ctDiemLHPsTmp;

        // this.ctDiemLHPs = this.loc_CTDiem_LopHocPhan(this.ctDiemLHPsTmp);
      }
    });
  }
  public layMonHoc() {
    this.monHocService.getMonHoc().subscribe((res) => {});
  }
  public layDiemSinhVien(maSinhVien: string) {
    this.diemSinhVienService.getAllFor(maSinhVien).subscribe(
      (res: any) => {
        if (res.data) {
          this.diemSinhViens = res.data;

          this.diemSinhViensTmp = this.diemSinhViens;
          // this.ganTenLopHocPhanDiemSV(this.diemSinhViens);
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
  public layCTDT_theoHocKi(maSV) {
    if (maSV) {
      this.kHDTService.layCTDT_theoMaSV(maSV).subscribe((res: any) => {
        this.dsTatCaKHDT = res.data;
        this.dsTatCaKHDTTmp = this.dsTatCaKHDT;
      });
    } else {
      this.dsTatCaKHDT = [];
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

        diemSV.forEach((ct) => {
          this.lopHocPhans.forEach((lop) => {
            if (ct.maLopHocPhan == lop.maLopHocPhan) {
              ct.tenLopHocPhan = lop.tenLopHocPhan;
            }
          });
        });
        this.diemSinhViens = diemSV;
        this.diemSinhViensTmp = diemSV;
      }
    });
  }
  public layLopHocPhan(maLopHoc) {
    this.LopHocPhanService.layLopHocPhantheoMaLop(maLopHoc).subscribe(
      (res) => {
        if (res) {
          this.lopHocPhans = res;
          this.lopHocPhansTmp = res;
          //this.lopHocPhans = this.locMaLopHocPhanTheoHocKi(this.lopHocPhans);
        }
      },
      (err) => console.log(err)
    );
  }

  //################################# Xu ly su kien ##################################
  onChangeCotDiem_LopHocPhan() {
    this.ctDiemLHPs = [];
    this.ctDiemLHPs = this.loc_CTDiem_LopHocPhan(this.ctDiemLHPsTmp);
  }
  onChangeChonHocKi() {
    let ctdiem = [];
    this.ctDiemLHPs = [];
    this.lopHocPhans = this.locMaLopHocPhanTheoHocKi(this.lopHocPhansTmp);

    this.ctDiemLHPsTmp.forEach((ct) => {
      this.lopHocPhans.forEach((lhp) => {
        if (ct.maHocPhan == lhp.maLopHocPhan) {
          ctdiem.push(ct);
        }
      });
    });
    if (ctdiem.length > 0) {
      this.ctDiemLHPs = ctdiem;
    }

    this.chonLop.setValue('');
  }
  //#########################
  onChangBangDiem() {
    let ds = [];
    this.chonHocKi.setValue('');
    if (this.chonHocKiBD.value) {
      this.dsTatCaKHDTTmp.forEach((el) => {
        if (el.hocKi == this.chonHocKiBD.value) {
          ds.push(el);
        }
      });
    } else {
      ds = this.dsTatCaKHDTTmp;
    }

    this.dsTatCaKHDT = ds;
  }
  onSubmitCapNhatSinhVien() {
    this.messages = [];
    if (!this.password.value) {
      this.toastr.warning('Vui lòng nhập mật khẩu để thay đổi', 'Thông báo');
    } else if (this.password.value != '123456') {
      this.toastr.warning('Mật khẩu không trùng nhau', 'Thông báo');
    } else {
      const req = {
        maSinhVien: this.sinhVien.maSinhVien,
        role: this.taiKhoan.role,
        sdt: this.sdt.value,
        nguoiChinhSua: this.taiKhoan.displayName,
      };
      this.capNhatSinhVien(req);
    }
  }
  onChangeHocKiTKB(){
    this.hocKiTam = [];
    if(this.chonTKB.value){
      this.hocKiTam.push({maHK:this.chonTKB.value, tenHK:this.chonTKB.value});
    }else{
      this.hocKiTam = this.hocKis;
    }
  }
  //################################ Xu ly loc #######################################
  public loc_CTDiem_LopHocPhan(ChiTietDiem) {
    if (this.chonLop.value) {
      let tmp = ChiTietDiem;
      ChiTietDiem = [];
      tmp.forEach((ct) => {
        if (ct.maHocPhan == this.chonLop.value) {
          ChiTietDiem.push(ct);
        }
      });
    } else {
      return ChiTietDiem;
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
    } else {
      return tmp;
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
