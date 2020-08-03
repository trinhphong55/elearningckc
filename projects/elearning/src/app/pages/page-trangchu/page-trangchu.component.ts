
import { Component, OnInit, Input } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { LopHocPhanService } from '../../../../../admin/src/app/services/lophocphan.service';
import { LopHocService } from '../../../../../admin/src/app/services/lop-hoc.service';
import { GvlhpService } from '../../../../../admin/src/app/services/gvlhp.service';
import { ApiService } from '../../../../../admin/src/app/services/api.service';
import {  SinhVienService} from '../../../../../admin/src/app/services//sinh-vien.service';

@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css']
})
export class PageTrangchuComponent implements OnInit {
  Doituong: any=1;
  dsLop:any;
  dsLopHP: any;
  maLopHoc: string;
  maLopHocPhan: any;
  filterDsLop:any;
  dsGiaoVien:any;
  dsGiaoVienLopHP:any;
  dsSinhVien:any;
 @Input() maBac:string;
  khoa:string;
  hocKi:string;
  formDanhSachLop = new FormGroup({
    maLopHoc: new FormControl(),
  })
  lophocs = [{ id: 1, name: 'Cơ sử dữ liệu', status: true },
  { id: 2, name: 'Nhập môn lập trình', status: true },
  { id: 3, name: 'Cấu trúc dữ liệu', status: true },
  { id: 4, name: 'Toán rời rạc', status: true },
  { id: 5, name: 'Lập trình laravel', status: true },
  { id: 6, name: 'lập trình HDT', status: true }
  ];
  constructor(
    private lopHocPhanService: LopHocPhanService,
    private lopHocService:LopHocService,
    private gvlhpService:GvlhpService,
    private apiService:ApiService,
    private SinhVienService:SinhVienService,) { }

  ngOnInit(): void {
    this.danhSachLop();
    this.danhSachGV();
    this.danhSachGVLHP();
    this.danhSachLopHocPhan();
    this.danhSachSinhVien();
  }
  toppings = new FormControl();
  toppingList: string[] = ['học kì 1', 'học kì 2', 'học kì 3', 'học kì 4', 'học kì 5', 'học kì 6'];
  khoahocs = new FormControl();
  khoahocList: string[] = ['khóa 17', 'khóa 18', 'khóa 19', 'khóa 20'];
  

  ///hien thi ds lop
  danhSachLop(){
    this.lopHocService.getAll().subscribe(
      (dsLop) => {
        this.dsLop = dsLop;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //danh Sach Sinh Vien
  danhSachSinhVien(){
    var phong:string= this.formDanhSachLop.get('maLopHoc').value
    this.SinhVienService.tinhTongSinhVien(phong).subscribe(
      (dsSinhVien) => {
        this.dsSinhVien = dsSinhVien.siSo;
      },
      (error) => {
        console.log(error);
      }
    );
    
    
  }
  
///hien thi dsgv
danhSachGV(){
  // this.apiService.layDanhSachGiaoVien().subscribe(
  //   (dsGiaoVien) => {
  //     this.dsGiaoVien = dsGiaoVien;
  //     console.log(this.dsGiaoVien)
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  this.dsGiaoVien=[
    { "maGiaoVien": "001",
    "ho": "Lữ",
    "ten": "Cao Tiến",
    "maBoMon": "A-BoMon",
    "ngaySinh": "7/6/1999",
    "sdt": "1234567890",
    "email": "lctien@gmail.com",
    "trinhDoChuyenMon": "Thạc sĩ",
    "cmnd": "11111111",
    "trangThai": 1,
    "matKhauBanDau": "e10adc3949ba59abbe56e057f20f883e"},
    {
      "maGiaoVien": "002",
      "ho": "Dương",
      "ten": "Trọng Đính",
      "maBoMon": "B-BoMon",
      "ngaySinh": "1/1/1999",
      "sdt": "0987654321",
      "email": "dtdinh@gmail.com",
      "trinhDoChuyenMon": "Thạc sĩ",
      "cmnd": "22222222",
      "trangThai": 1,
      "matKhauBanDau": "e10adc3949ba59abbe56e057f20f883e"
  }
  ]
 
}

// ds lớp hoc phần
 danhSachGVLHP(){
  this.gvlhpService.getall().subscribe(
    (dsGiaoVienLopHP) => {
      this.dsGiaoVienLopHP = dsGiaoVienLopHP;
    },
    (error) => {
      console.log(error);
    }
  );

}
  //hien thi ds lop hoc phan
  danhSachLopHocPhan() {
    if (this.Doituong == 1) {
      this.maLopHoc = '30061711';
      this.lopHocPhanService.layLopHocPhantheoMaLop(this.maLopHoc).subscribe(
        dsLopHP => {
          this.dsLopHP = dsLopHP;
          this.filterDsLop = this.dsLopHP.filter(x=>{
            if(x.hocKi=1)
              return x;
          })
         
          console.log(this.filterDsLop)
          console.log(this.maBac)
          console.log(this.khoa)
          console.log(this.hocKi)
        },
        (error) => {
          console.log(error)
        });

        ///lây theo lọc
     
    }
    else{
      this.maLopHocPhan = 1;
      this.lopHocPhanService.getLopHocPhanbyMaLopHocPhan(this.maLopHocPhan ).subscribe(
        (dsLopHP) => {
          this.dsLopHP = dsLopHP;
        },
        (error) => {
          console.log(error)
        });
    }
  }
  //hien thi danh sach danh sach lop
}