import { Component, OnInit } from '@angular/core';
import {CnttBoSuuTapService} from '../../services/bosuutap.service'

@Component({
  selector: 'app-donvilienket',
  templateUrl: './donvilienket.component.html',
  styleUrls: ['./donvilienket.component.css']
})
export class DonvilienketComponent implements OnInit {
  DonViLienKet: any = [];
  constructor(private cnttBoSuuTapService: CnttBoSuuTapService) {   
    this.loadDanhSachDonViLienKet()
  }
  ngOnInit(): void {
  }
  loadDanhSachDonViLienKet() {
    this.cnttBoSuuTapService.danhSachItemLienKiet().subscribe((data) => {
      console.log(data);
      this.DonViLienKet = data.data;
    });
  }

}
