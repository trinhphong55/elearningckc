import { Component, OnInit } from '@angular/core';
//trang ca nhan gv
import { FormControl, FormGroup } from '@angular/forms';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import { SinhVienService } from '../../../../../admin/src/app/services//sinh-vien.service';
import { BaiGiangService } from '../../services/bai-giang.service';
import { BaiTapService } from '../../services/bai-tap.service';
import { CookieService } from 'ngx-cookie-service';
import { GVLHP } from '../../../../../admin/src/app/interfaces/gvlhp.interface'
import { from } from 'rxjs';
import { publish } from 'rxjs/operators';
import {GiaoVienService} from '../../services/giao-vien.service';
import { BacService } from '../../../../../admin/src/app/services/Bac.service';
@Component({
  selector: 'app-page-trangcanhangv',
  templateUrl: './page-trangcanhangv.component.html',
  styleUrls: ['./page-trangcanhangv.component.css']
})
export class PageTrangcanhangvComponent implements OnInit {

  //trang ca nhan gv

  maBac: any;
  hocKi: any = 1;
  maKhoa: any = 1;
  test: any;
  Doituong: any;
  thongtin: any;
  dsLop: any;
  dsLopHP;
  dsLopHPGV: any;
  giaovien:any;
  dsBac: any;
  bac: any;
  dsBaiGiangLHP:any;
  dsBaiTapLHP:any
  dsGiaoVienBymaGv: any;
  filterDsLop: any = [];
  capnhapttGV:any;
  sodienthoai:any;
  newpassword:any;
  maGiaoVien:any;
  sdt:any;
  newgiaovien:any;
  khoa:any;
  public giaoVienFormGroup: FormGroup;
  objectKeys = Object.keys;

  formDanhSachLop = new FormGroup({
    bac: new FormControl("3"),
    hocKi: new FormControl("1"),
    khoa: new FormControl("18"),
  })
  formCapnhapGV= new FormGroup({
    sodienthoai: new FormControl(),
    newpassword: new FormControl(),
    maGiaoVien:new FormControl(),
  })
  constructor(

    //trang ca nhan gv
    private lopHocPhanService: LopHocPhanService,
    private lopHocService: LopHocService,
    private gvlhpService: GvlhpService,
    private apiService: ApiService,
    private SinhVienService: SinhVienService,
    private cookie: CookieService,
    private baiGiangService: BaiGiangService,
    private baiTapService: BaiTapService,
    private bacService: BacService,
    private giaoVienService:GiaoVienService
  ) { }

  ngOnInit(): void {

    //trang ca nhan gv
    this.danhSachLop();
    this.danhSachLopHocPhan();
    this.layCookie();
    this.LaySachLopHocPhan();
    this.danhSachLopGV();
    this.layThongtinGV();
    this.layDanhSachBac();
  }

  //trang  ca nhan gv
  // lay cookie
  layCookie() {
    this.maKhoa = this.cookie.get("khoa")
    this.maBac = this.cookie.get("bac")
    this.hocKi = this.cookie.get("hocKi")
    this.Doituong = this.cookie.get("role");
    this.thongtin = this.cookie.get("email");
  }
  ///hien thi ds lop
  danhSachLop() {
    this.lopHocService.getAll().subscribe(
      dsLop => {
        this.dsLop = dsLop;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  LaySachLopHocPhan() {

    this.lopHocPhanService.getLopHocPhan().subscribe(
      dsLopHP => {
        this.dsLopHP = dsLopHP;

      },
      (error) => {
        console.log(error)
      });

  }


  ///hien thi dsgv
  danhSachLopGV() {
    if (this.Doituong == 'GV') {
      try {
        this.thongtin = this.cookie.get("email");
        this.lopHocPhanService.getLopHocPhanbyemail(this.thongtin).subscribe(
          dsGiaoVienBymaGv => {
            this.dsGiaoVienBymaGv = dsGiaoVienBymaGv;
            this.filterDsLop = []
            this.dsLop.forEach(lop => {
              this.dsGiaoVienBymaGv.find(p => {
                if (p.maLopHoc == lop.maLopHoc && p.hocKi==this.formDanhSachLop.get('hocKi').value && lop.maBac== this.formDanhSachLop.get('bac').value && lop.khoa== this.formDanhSachLop.get('khoa').value) {
                  console.log()
                  this.filterDsLop.push(p)
                }
              });
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        return error;
      }
    }
  }

  //hien thi ds lop hoc phan
  danhSachLopHocPhan() {

  }
  //Lay danh sach bai giang
  danhSachBaiGiangLHP(){
    this.baiGiangService.layTatCa().subscribe(
      dsBaiGiangLHP => {
        this.dsBaiGiangLHP = dsBaiGiangLHP
      },
      (error) => {
        console.log(error)
      });
    }
    //Lay danh sach bai tap
  danhSachBaiTapLHP(){
    this.baiTapService.layTatCa().subscribe(
      dsBaiTapLHP => {
        this.dsBaiTapLHP = dsBaiTapLHP
      },
      (error) => {
        console.log(error)
      });
    }
  //lấy ds bậc
  layDanhSachBac() {
    this.bacService.getBac().subscribe(
      (dsBac) => {
        this.dsBac = dsBac;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  public layThongtinGV(){
    this.giaoVienService.Laythongtingiaovien(this.thongtin).subscribe(

      giaovien =>{
        this.giaovien=giaovien;
        this.giaovien.filter(x=>{
          this.formCapnhapGV= new FormGroup({
            sodienthoai: new FormControl(x.sdt),
            newpassword: new FormControl(x.password),
            maGiaoVien: new  FormControl(x.maGiaoVien)
          })
        })
      },
      (error) => {
        console.log(error)
      }
    );
  }
  public capnhapGV(){
    if((this.formCapnhapGV.get("sodienthoai").value)==''||(this.formCapnhapGV.get("newpassword").value)==''){
      alert("cập nhập thất bại ! số điện thoại hoặc mật khẩu không được để trống");
    }else{
      this.capnhapttGV={maGiaoVien:(this.formCapnhapGV.get("maGiaoVien").value),sdt:(this.formCapnhapGV.get("sodienthoai").value),password:(this.formCapnhapGV.get("newpassword").value)}
      this.giaoVienService.CapNhapgv(this.capnhapttGV).subscribe(
        newgiaovien=>{
          this.newgiaovien=newgiaovien;
          this.layThongtinGV();
           alert("cập nhập thành công");
    },
      (error) => {
        console.log(error)

      }
    );
    }
  }
}
