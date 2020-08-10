import { Component, OnInit } from '@angular/core';
import { DiemthiService } from '../../services/diemthi.service';
@Component({
  selector: 'app-page-tracuudiem',
  templateUrl: './page-tracuudiem.component.html',
  styleUrls: ['./page-tracuudiem.component.css']
})
export class PageTracuudiemComponent implements OnInit {

  constructor(private DiemthiService: DiemthiService) {}

  ngOnInit(): void {
  }
  DiemThi: any[];
  mssv: any;
  TraCuuDiem(mssv): void {
    if (mssv !== null) {
      this.DiemthiService.TraCuuDiem(mssv).subscribe((data) => {
          this.DiemThi = data;
          // console.log(this.DiemThi.length);
        });
    }
  }
}
