import { Component, OnInit } from '@angular/core';
import { TienIchSinhVienCnttService } from '../../services/TienIchSV.service';
@Component({
  selector: 'app-tienichsv',
  templateUrl: './tienichsv.component.html',
  styleUrls: ['./tienichsv.component.css'],
})
export class TienichsvComponent implements OnInit {
  TienIch: any = [];
  constructor(private tienIchSinhVienCnttService: TienIchSinhVienCnttService) {
    this.loadDanhSachTienIch();
  }

  ngOnInit(): void {}
  loadDanhSachTienIch() {
    this.tienIchSinhVienCnttService.danhSachTienIch().subscribe((data) => {
      // console.log(data);
      this.TienIch = data.data;
    });
  }
}
