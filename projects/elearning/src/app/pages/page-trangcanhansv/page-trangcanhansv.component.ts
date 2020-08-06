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
import { CTDT } from '../../models/ctdt.interface';

@Component({
  selector: 'app-page-trangcanhansv',
  templateUrl: './page-trangcanhansv.component.html',
  styleUrls: ['./page-trangcanhansv.component.css'],
})
export class PageTrangcanhansvComponent implements OnInit {
  public taiKhoan = {
    displayName: '0306171004',
    email: '0306171004@caothang.edu.vn',
    password: '12345',
    role: 'sv',
    isValid: true,
  };
  public sinhVien: SinhVien;
  public sinhViens: SinhVien[] = [];

  public ctDiemLHP: ChiTietDiemSVLHP;
  public ctDiemLHPs: ChiTietDiemSVLHP[] = [];

  public lopHocPhan: LopHocPhan;
  public lopHocPhans: LopHocPhan[] = [];

  public cotDiems: CotDiemSinhVienLopHocPhan[] = [];

  public diemSinhViens: DiemSinhVien[] = [];
  public dsKHDT: KHDT_DiemSinVien[] = [];

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
    private monHocService:MonhocService
  ) {}

  ngOnInit(): void {
    this.layThongTinSV(this.taiKhoan.displayName);
    this.layDiemSinhVien(this.taiKhoan.displayName);
    // this.layLopHocPhan();
    // this.layCotDiemSinhVienLHP();
    this.sinhVienFormGroup = new FormGroup({
      mssv: new FormControl(''),
      gioiTinh: new FormControl(''),
      ho: new FormControl(''),
      ten: new FormControl(''),
      email: new FormControl(''),
      ngaySinh: new FormControl(''),
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
    return this.sinhVienFormGroup.get('confirmPassword');
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

  public layThongTinSV(maSV: string) {
    this.sinhVienService.getonesv(maSV).subscribe(
      (sv) => {
        if (sv.data) {
          this.sinhVien = sv.data;
          let maCT = '3006171';
          this.layCTDT_theoHocKi(this.chonHocKiBD.value, maCT);
          this.setValueSinhVienFormGroup(this.sinhVien);
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
        this.messages.push({ msg: res.message, status: res.status });
        console.log(this.messages);
      },
      (err: any) => {
        this.messages.push({ msg: err.message, status: err.status });
        console.log(err);
      }
    );
  }
  public layThongTinDiemLHP(maSv: string) {
    this.ctDiemsvLhpService.layCTtheoMaSV(maSv).subscribe((res: any) => {
      if (res.data) {
        this.ctDiemLHPs = res.data;
        this.ganTenCotDiemCTDiem(this.ctDiemLHPs);
        this.ganTenLopHocPhanCTDiem(this.ctDiemLHPs);
      }
    });
  }

  public layDiemSinhVien(maSinhVien: string) {
    this.diemSinhVienService.getAllFor(maSinhVien).subscribe(
      (res: any) => {
        this.diemSinhViens = res;
        this.ganTenLopHocPhanDiemSV(this.diemSinhViens);
      },
      (err) => console.log(err)
    );
  }
  public setValueSinhVienFormGroup(sinhVien: SinhVien) {
    this.mssv.setValue(sinhVien.maSinhVien);
    this.gioiTinh.setValue(sinhVien.gioiTinh);
    this.ho.setValue(sinhVien.ho);
    this.ten.setValue(sinhVien.ten);
    this.ngaySinh.setValue(sinhVien.ngaySinh);
    this.password.setValue(sinhVien.matKhau);
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
  public loc_Theo_LopHocPhan(diemSV) {
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
  public ganTenLopHocPhanCTDiem(ChiTietDiem: ChiTietDiemSVLHP[]) {
    this.LopHocPhanService.getLopHocPhan().subscribe(
      (res) => {
        if (res) {
          this.lopHocPhans = res;
          this.lopHocPhans = this.locMaLopHocPhanTheoHocKi(this.lopHocPhans);
          ChiTietDiem = this.loc_CTDiem_LopHocPhan(this.ctDiemLHPs);
          console.log(ChiTietDiem);
          ChiTietDiem.forEach((ct) => {
            this.lopHocPhans.forEach((lop) => {
              if (ct.maHocPhan == lop.maLopHocPhan) {
                ct.tenLopHocPhan = lop.tenLopHocPhan;
              }
            });
          });
          this.ctDiemLHPs = ChiTietDiem;
        }
      },
      (err) => console.log(err)
    );
  }
  public ganTenCotDiemCTDiem(ChiTiemDiems: ChiTietDiemSVLHP[]) {
    this.cotDiemService.layTatCa().subscribe((res: any) => {
      this.cotDiems = res;
      ChiTiemDiems.forEach((ct) => {
        this.cotDiems.forEach((lop) => {
          if (ct.maCotDiem == lop.maCotDiem) {
            ct.tenCotDiem = lop.tenCotDiem;
          }
        });
      });
    });
  }
  public layCTDT_theoHocKi(hocKi, maCTDT) {
    if(hocKi){
      this.kHDTService
      .getKHDTByHocKiNMaCTDT(maCTDT, hocKi)
      .subscribe((res: any) => {
        this.dsKHDT = res;
        this.dsKHDT.forEach((khdt) => {
          this.diemSinhViens.forEach((diem) => {
            if ((diem.maDaoTao == khdt.maDaoTao)) {
              khdt.diemSinhVien = diem;
            }
          });
          this.monHocService.getMonHocFromMaMonHoc(khdt.maMonHoc).subscribe((res:any) =>{
            khdt.tenMonHoc = res.tenMonHoc;
          });

        });
      });
    }
    else{
      this.dsKHDT = [];
    }

  }
  //################################# Xu ly su kien ##################################
  onChangeDanhSachCotDiem() {
    this.layThongTinSV(this.taiKhoan.displayName);
    this.layThongTinDiemLHP(this.taiKhoan.displayName);
  }
  onChangBangDiem() {
    this.chonHocKi.setValue('');
    this.layDiemSinhVien(this.taiKhoan.displayName);
    this.layThongTinSV(this.taiKhoan.displayName);

  }
  onSubmitCapNhatSinhVien() {
    this.sinhVien.matKhau = this.password.value;
    this.sinhVien.nguoiChinhSua = this.taiKhoan.displayName;
    this.sinhVien.sdt = this.sdt.value;
    const req = {
      maSinhVien: this.sinhVien.maSinhVien,
      tokens: '12341234',
      role: this.taiKhoan.role,
      data: this.sinhVien,
    };
    this.capNhatSinhVien(req);
  }
  //################################ Xu ly loc #######################################
  public loc_CTDiem_LopHocPhan(
    ChiTietDiems: ChiTietDiemSVLHP[]
  ): ChiTietDiemSVLHP[] {
    let tmp = ChiTietDiems;
    ChiTietDiems = [];
    if (this.chonLop.value || this.chonHocKi.value) {
      tmp.forEach((ct) => {
        if (ct.maHocPhan == this.chonLop.value) {
          ChiTietDiems.push(ct);
        }
      });
    }
    return ChiTietDiems;
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
}
