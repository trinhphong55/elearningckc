import { Component, OnInit } from '@angular/core';
import {CnttBoSuuTapService} from '../../services/bosuutap.service'

@Component({
  selector: 'app-slidersinhvien',
  templateUrl: './slidersinhvien.component.html',
  styleUrls: ['./slidersinhvien.component.css']
})
export class SlidersinhvienComponent implements OnInit {
  Item: any = [];

  constructor(private cnttBoSuuTapService: CnttBoSuuTapService) {
    this.loadDanhSachItemSlider()
   }

  ngOnInit(): void {
  }
  loadDanhSachItemSlider() {
    this.cnttBoSuuTapService.danhSachItemSlider().subscribe((data) => {
      console.log(data);
      this.Item = data.data;
    });
  }
}
