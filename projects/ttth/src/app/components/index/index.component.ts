import { Component, OnInit } from '@angular/core';
import { ttthBanner } from '../../models/ttthBanner';
import { ttthCamOn } from '../../models/ttthCamOn';
import { BannerService } from '../../services/banner.service';
import { CamonService } from '../../services/camon.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  Banner: ttthBanner[];
  CamOn: ttthCamOn[];
  constructor(private bannerService: BannerService,private camonService: CamonService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
    this.getCamOnfromServices();
  }
  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe(data => this.Banner = data);
  }
  getCamOnfromServices(): void {
    this.camonService.get().subscribe(data => this.CamOn = data);
  }
}
