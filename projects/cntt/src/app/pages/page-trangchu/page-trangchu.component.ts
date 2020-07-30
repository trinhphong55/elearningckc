import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { TienIchSinhVienCnttService} from '../../services/TienIchSV.service'

declare var $: any;

@Component({
  selector: 'app-page-trangchu',
  templateUrl: './page-trangchu.component.html',
  styleUrls: ['./page-trangchu.component.css']
})
export class PageTrangchuComponent implements OnInit {
  //TienichSV//

  constructor(private tienIchSinhVienCnttService: TienIchSinhVienCnttService) { }

  ngOnInit(): void { }

}
