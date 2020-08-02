import { Component, OnInit } from '@angular/core';
import { ttthThongTinWeb } from '../../models/ttthThongTinWeb';
import { ThongtinwebService } from '../../services/thongtinweb.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ThongTinWeb: ttthThongTinWeb[];
  constructor(private thongtinwebService: ThongtinwebService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
  }
  getBannerfromServices(): void {
    this.thongtinwebService.getThongTinWeb().subscribe(data => this.ThongTinWeb = data);
  }
}
