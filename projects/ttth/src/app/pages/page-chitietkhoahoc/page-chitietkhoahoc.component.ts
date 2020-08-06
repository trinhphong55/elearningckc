import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {KhoahocService} from '../../services/khoahoc.service';

@Component({
  selector: 'app-page-chitietkhoahoc',
  templateUrl: './page-chitietkhoahoc.component.html',
  styleUrls: ['./page-chitietkhoahoc.component.css']
})
export class PageChitietkhoahocComponent implements OnInit {
  Khoahoc : any = [];
  KhoahocKhac : any = [];
  constructor(private khoahocService: KhoahocService,private actRoute: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getChiTietKhoahoc(id);
    this.getKhoahocKhac();
  }
  getChiTietKhoahoc(id){
    this.khoahocService.getChiTietKhoaHoc(id).subscribe(data => {
      this.Khoahoc = data.data;
    });
  }
  getKhoahocKhac(){
    this.khoahocService.getKhoaHocKhac().subscribe(data => {
      this.KhoahocKhac = data.data;
    });
  }

}
