import { Component, OnInit } from '@angular/core';
import { LophocService } from '../../services/lophoc.service';

@Component({
  selector: 'app-page-danhsachlophoc',
  templateUrl: './page-danhsachlophoc.component.html',
  styleUrls: ['./page-danhsachlophoc.component.css']
})
export class PageDanhsachlophocComponent implements OnInit {
  LopHoc: any[];
  getday= Date.now();
  constructor(private lophocService: LophocService) {}

  ngOnInit(): void {
    this.getLopHoc();
  }
  getLopHoc(){
    this.lophocService.get().subscribe(data => this.LopHoc = data);
  }
}
