import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-hocphan',
  templateUrl: './navbar-hocphan.component.html',
  styleUrls: ['./navbar-hocphan.component.css'],
})
export class NavbarHocphanComponent implements OnInit {
malophocphan:any;
lophocphan:string;
baigiang:string;
moinguoi:string;
cotdiem:string;
chamdiem:string;
tongdiem:string;
quyen:string="";
doiTuong:any;
  constructor(   private router: ActivatedRoute, private route: Router,  private cookie: CookieService,) { }

  ngOnInit(): void {
    this.malophocphan = this.router.snapshot.paramMap.get('id');
    this.lophocphan="/lophocphan/"+this.malophocphan;
    this.baigiang="/baigiang/"+this.malophocphan;
    this.moinguoi="/moinguoi/"+this.malophocphan;
    this.cotdiem="/cotdiem/"+this.malophocphan;
    this.chamdiem="/chamdiem/"+this.malophocphan;
    this.tongdiem="/tongdiem/"+this.malophocphan;

    this.quyenXemDiem()
  }
  quyenXemDiem()
  {
    this.doiTuong = this.cookie.get("role");
    if(this.doiTuong== 'SV')
    {
      this.quyen='none'
    }
  }
}
