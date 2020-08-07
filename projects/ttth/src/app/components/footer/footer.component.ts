import { Component, OnInit } from '@angular/core';
import { ttthThongTinWeb } from '../../models/ttthThongTinWeb';
import { ThongtinwebService } from '../../services/thongtinweb.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ThongTinWeb: ttthThongTinWeb[];
  constructor(private thongtinwebService: ThongtinwebService) { }

  ngOnInit(): void {
    this.getThongTinWeb();
  }
  getThongTinWeb(): void {
    this.thongtinwebService.getThongTinWeb().subscribe(data => this.ThongTinWeb = data);
  }
}
