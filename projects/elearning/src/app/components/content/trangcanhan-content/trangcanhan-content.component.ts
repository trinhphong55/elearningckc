import { FormGroup, FormControl } from '@angular/forms';
import { SinhVienService } from './../../../services/sinh-vien.service';
import { SinhVien } from './../../../models/SinhVien.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-trangcanhan-content',
  templateUrl: './trangcanhan-content.component.html',
  styleUrls: ['./trangcanhan-content.component.css'],
})
export class TrangcanhanContentComponent implements OnInit {
  public sinhVien: SinhVien;
  public sinhVienTams: SinhVien;

  public sinhViens: SinhVien[] = [];
  public sinhVienFormGroup: FormGroup;
  public tmp: any[];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private sinhVienService: SinhVienService
  ) {}

  ngOnInit(): void {
    this.sinhVienFormGroup = new FormGroup({
      ho: new FormControl(''),
      ten: new FormControl(),
      email: new FormControl(''),
      ngaySinh: new FormControl(''),
      sdt: new FormControl(''),
      password: new FormControl(''),
      cofirmPassword: new FormControl(''),
    });
    this.layThongTinSV('0306171004');
    this.setValueSinhVienFormGroup();
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

  public layThongTinSV(maSV: string) {
    this.sinhVienService.getonesv(maSV).subscribe((sv) => {
      if (sv.data) {
        this.sinhVien = sv.data;
        let sinhviens = [];
        sinhviens.push(this.sinhVien);
        this.sinhViens = sinhviens;

      }
    });
  }
  public setValueSinhVienFormGroup() {
    console.log(this.sinhViens);
    this.ho.setValue('huy');
    console.log(this.sinhVienFormGroup.value);

    // this.sinhVienFormGroup.get('ho').setValue('tran');
  }
  showThongtinsv() {
    this.route.navigate(['thongtinsv'], { relativeTo: this.router });
  }
  showThoikhoabieu() {
    this.route.navigate(['thoikhoabieusv'], { relativeTo: this.router });
  }
  showThongtindemso() {
    this.route.navigate(['diemsosv'], { relativeTo: this.router });
  }
}
