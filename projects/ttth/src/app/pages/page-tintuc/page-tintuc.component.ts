import { Component, OnInit } from '@angular/core';
import {TintucService} from '../../services/tintuc.service';

@Component({
  selector: 'app-page-tintuc',
  templateUrl: './page-tintuc.component.html',
  styleUrls: ['./page-tintuc.component.css']
})
export class PageTintucComponent implements OnInit {
  TinTuc : any = [];
  constructor(private tintucService: TintucService) {}

  ngOnInit(): void {
    this.getAllTinTuc()
  }
  getAllTinTuc(){
    this.tintucService.getAllTinTuc().subscribe(data => {
      this.TinTuc = data.data;
    });
  }
}
