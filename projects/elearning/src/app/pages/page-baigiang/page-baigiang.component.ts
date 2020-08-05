import { ChuDe } from './../../models/chu-de.interface';
import { ChuDeService } from './../../services/chu-de.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-page-baigiang',
  templateUrl: './page-baigiang.component.html',
  styleUrls: ['./page-baigiang.component.css'],
})
export class PageBaigiangComponent implements OnInit {

  public dsChuDe :ChuDe[] = [];
  public maLopHocPhan:number = 1;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService
  ) {}

  ngOnInit(): void {
    this.layDS_ChuDe();
  }
  public layDS_ChuDe(){
    this.chuDeService.layTheo_maLopHocPhan(this.maLopHocPhan).subscribe((res:any) => {
      if(res.data){
        this.dsChuDe = res.data;

      }else{
        console.log(res);
      }
    })
  }

  public xem_ChuDe(chude){
    this.router.navigate(['chude', chude],{ relativeTo: this.route });

  }
  showAllchude() {
    this.router.navigate(['all'], { relativeTo: this.route });
  }
}
