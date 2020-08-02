import { Component, OnInit } from '@angular/core';
import { ttthBanner } from '../../models/ttthBanner';
import { ttthCamOn } from '../../models/ttthCamOn';
import { ttthTienIch } from '../../models/ttthTienIch';
import { ttthTinTuc } from '../../models/ttthTinTuc';
import { ttthKhoaHoc } from '../../models/ttthKhoaHoc';
import { BannerService } from '../../services/banner.service';
import { CamonService } from '../../services/camon.service';
import { TienichService } from '../../services/tienich.service';
import { TintucService } from '../../services/tintuc.service';
import { KhoahocService } from '../../services/khoahoc.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  Banner: ttthBanner[];
  CamOn: ttthCamOn[];
  TienIch: ttthTienIch[];
  TinTucChinh: ttthTinTuc[];
  TinTucPhu: ttthTinTuc[];
  KhoaHoc: ttthKhoaHoc[];
  constructor(private bannerService: BannerService,private camonService: CamonService,private tienichService: TienichService,private tintucService: TintucService,private khoahocService: KhoahocService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
    this.getCamOnfromServices();
    this.getTienIchfromServices();
    this.getTinTucChinh();
    this.getTinTucPhu();
    this.getKhoaHoc();
  }
  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe(data => this.Banner = data);
  }
  getCamOnfromServices(): void {
    this.camonService.get().subscribe(data => this.CamOn = data);
  }
  getTienIchfromServices(): void {
    this.tienichService.get().subscribe(data => this.TienIch = data);
  }
  getTinTucChinh():void{
    this.tintucService.getTinTucChinh().subscribe(data => this.TinTucChinh = data);
  }
  getTinTucPhu():void{
    this.tintucService.getTinTucPhu().subscribe(data => this.TinTucPhu = data);
  }
  getKhoaHoc():void{
    this.khoahocService.get().subscribe(data => this.KhoaHoc = data);
  }
}
