import { Component, OnInit ,Input} from '@angular/core';
import {BacService} from'../../../../../../admin//src/app/services/Bac.service';
import { FormControl, FormGroup, Validators, FormArray, FormControlName } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import { from } from 'rxjs';
@Component({
  selector: 'app-navbar-trangchu',
  templateUrl: './navbar-trangchu.component.html',
  styleUrls: ['./navbar-trangchu.component.css']
})
export class NavbarTrangchuComponent implements OnInit {
dsBac:any;
khoa:any=17;
bac:any=3;
hocKi:any=1;

formDanhSachLop = new FormGroup({
  khoa: new FormControl("-1"),
  bac: new FormControl("-1"),
  hocKi:new FormControl("1"),
})

  constructor(private bacService:BacService ,
    private cookie:CookieService) { }

  ngOnInit(): void {
    this.layDanhSachBac();
    this.onFilter();
  }
  //lấy ds bậc
  layDanhSachBac(){
    this.bacService.getBac().subscribe(
      (dsBac)=>{
        this.dsBac=dsBac;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

   //filter 
  onFilter(){
    this.khoa=this.formDanhSachLop.get('khoa').value
    this.cookie.set("khoa",this.khoa)

    this.bac=this.formDanhSachLop.get('bac').value
    this.cookie.set("bac",this.bac)

    this.hocKi=this.formDanhSachLop.get('hocKi').value
    this.cookie.set("hocKi",this.hocKi)
  
  }

}
