import { BaiGiang } from '../../../../../models/bai-giang.interface';
import { BaiGiangService } from './../../../../../services/bai-giang.service';
import { ChuDeService } from './../../../../../services/chu-de.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChuDe } from './../../../../../models/chu-de.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chude2',
  templateUrl: './chude2.component.html',
  styleUrls: ['./chude2.component.css'],
})
export class Chude2Component implements OnInit {
  public chuDe:ChuDe;
  public dsBaiGiang: BaiGiang[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chuDeService: ChuDeService,
    private baiGiangService: BaiGiangService
  ) {}

  ngOnInit(): void {
    this.xem_ChuDe();
  }
  public xem_ChuDe() {

    this.route.params.subscribe((params) => {
      this.chuDeService.layMot(params.id).subscribe((res:any) => {
        if(res.data){
          this.chuDe = res.data;

        }
      });
      this.baiGiangService.layTheoMaChuDe(params.id).subscribe((res:any) => {
        if(res.data){
          this.dsBaiGiang = res.data;
          this.dsBaiGiang.forEach(el => {
            el.ngayChinhSua = new Date(el.ngayChinhSua).toUTCString();
          })

        }
      });
    });

  }
}
