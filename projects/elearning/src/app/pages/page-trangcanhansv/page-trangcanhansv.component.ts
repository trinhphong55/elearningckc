import { CotDiemSinhVienLopHocPhanService } from './../../services/cotdiem-sinhvien-lophocphan.service';
import { CotDiemSinhVienLopHocPhan } from './../../models/CotDiemSinhVienLopHocPhan.interface';
import { LopHocPhanService } from './../../services/lophocphan.service';
import { ChiTietDiemSVLHP } from './../../models/ChiTietDiemSVLHP.interface';
import { CtDiemsvLhpService } from './../../services/ct-diemsv-lhp.service';
import { SinhVienService } from './../../services/sinh-vien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SinhVien } from './../../models/SinhVien.interface copy';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LopHocPhan } from '../../models/lophocphan.interface';

@Component({
  selector: 'app-page-trangcanhansv',
  templateUrl: './page-trangcanhansv.component.html',
  styleUrls: ['./page-trangcanhansv.component.css'],
})
export class PageTrangcanhansvComponent implements OnInit {
  public sinhVien: SinhVien;
  public sinhViens: SinhVien[] = [];

  public ctDiemLHP: ChiTietDiemSVLHP;
  public ctDiemLHPs: ChiTietDiemSVLHP[] = [];

  public lopHocPhan: LopHocPhan;
  public lopHocPhans: LopHocPhan[] = [];

  public cotDiems: CotDiemSinhVienLopHocPhan[] = [];
  public sinhVienFormGroup: FormGroup;
  public locChiTietGroupForm: FormGroup;

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
    private cotDiemService: CotDiemSinhVienLopHocPhanService
  ) {}

  ngOnInit(): void {
    this.layThongTinSV('0306171004');
    // this.layLopHocPhan();
    // this.layCotDiemSinhVienLHP();
    this.sinhVienFormGroup = new FormGroup({
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

  public layThongTinSV(maSV: string) {
    this.sinhVienService.getonesv(maSV).subscribe((sv) => {
      if (sv.data) {
        this.sinhVien = { ...sv.data };
        this.setValueSinhVienFormGroup(this.sinhVien);
        this.layThongTinDiemLHP(this.sinhVien.maSinhVien);
        this.sinhViens.push(this.sinhVien);
      }
    });
  }
  public layThongTinDiemLHP(maSv: String) {
    this.ctDiemsvLhpService.layCTtheoMaSV(maSv).subscribe((res: any) => {
      if (res.data) {
        this.ctDiemLHPs = res.data;
        //  this.ctDiemLHPs.forEach(el => {
        //    this.layLopHocPhanTheoMaLHP(el.maHocPhan);
        //  })
        this.layLopHocPhan(this.ctDiemLHPs);
        this.layCotDiemSinhVienLHP(this.ctDiemLHPs);
        this.ctDiemLHPs = this.locLopHocPhan(this.ctDiemLHPs);
      }
    });
  }
  public setValueSinhVienFormGroup(sinhVien: SinhVien) {
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
  public layLopHocPhan(ChiTiemDiems: ChiTietDiemSVLHP[]) {
    this.LopHocPhanService.getLopHocPhan().subscribe((res) => {
      if (res) {
        this.lopHocPhans = res;
        this.lopHocPhans = this.locMaLopTheoHocKi(this.lopHocPhans);
        ChiTiemDiems.forEach((ct) => {
          this.lopHocPhans.forEach((lop) => {
            if (ct.maHocPhan == lop.maLopHocPhan) {
              ct.tenLopHocPhan = lop.tenLopHocPhan;
            }
          });
        });
      }
    });
  }
  public layCotDiemSinhVienLHP(ChiTiemDiems: ChiTietDiemSVLHP[]) {
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
  //################################# Xu ly su kien ##################################
  onChangeChonHocKi() {
    console.log(this.locChiTietGroupForm.value);
    this.layThongTinSV('0306171004');
  }
  //################################ Xu ly loc #######################################
  public locLopHocPhan(ChiTietDiems: ChiTietDiemSVLHP[]): ChiTietDiemSVLHP[] {
    if (this.chonLop.value) {
      let tmp = ChiTietDiems;
      ChiTietDiems = [];
      tmp.forEach((ct) => {
        if (ct.maHocPhan == this.chonLop.value) {
          ChiTietDiems.push(ct);
        }
      });
      return ChiTietDiems;
    }
  }
  public locMaLopTheoHocKi(lopHocPhans: LopHocPhan[]) {
    if (this.chonHocKi.value) {
      let tmp = lopHocPhans;
      lopHocPhans = [];
      tmp.forEach((ct) => {
        if (ct.hocKi == this.chonHocKi.value) {
          lopHocPhans.push(ct);
        }
      });
    }
    return lopHocPhans;
  }
}
