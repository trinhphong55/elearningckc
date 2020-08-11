import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CotDiemSinhVienLopHocPhanService } from '../../services/cotdiem-sinhvien-lophocphan.service';
@Component({
  selector: 'app-page-cotdiem',
  templateUrl: './page-cotdiem.component.html',
  styleUrls: ['./page-cotdiem.component.css']
})
export class PageCotodiemComponent implements OnInit {

  maLopHocPhan: string;
  dsCotDiem: any;
  constructor(private router: ActivatedRoute, private cotDiemSVLHP: CotDiemSinhVienLopHocPhanService) {
    this.maLopHocPhan = this.router.snapshot.paramMap.get('id');
    this.cotDiemSVLHP.layDanhSachCotDiemTheoMaLHP(this.maLopHocPhan).subscribe(
      response => {
        this.dsCotDiem = response;
      }
    )
  }

  ngOnInit(): void {
    //Lấy mã học phần từ URL
  }

}
