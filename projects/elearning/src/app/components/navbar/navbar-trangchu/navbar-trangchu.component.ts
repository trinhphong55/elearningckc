import { Component, OnInit ,Input} from '@angular/core';
import {BacService} from'../../../../../../admin//src/app/services/Bac.service';
import { FormControl, FormGroup, Validators, FormArray, FormControlName } from '@angular/forms';
// import {PageTrangchuComponent} from'../../../pages/page-trangchu/page-trangchu.component'
import { from } from 'rxjs';
@Component({
  selector: 'app-navbar-trangchu',
  templateUrl: './navbar-trangchu.component.html',
  styleUrls: ['./navbar-trangchu.component.css']
})
export class NavbarTrangchuComponent implements OnInit {
dsBac:any;
khoa:string='';
bac:number=-1;
hocKi:string='';

formDanhSachLop = new FormGroup({
  khoa: new FormControl(),
  bac: new FormControl(),
  hocKi:new FormControl(),
})

  constructor(private bacService:BacService ) { }

  ngOnInit(): void {
    this.layDanhSachBac();
    this.onFilterKhoa();
    this.onFilterBac();
    this.onFilterHocKi();
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
  //filter khoa
  onFilterKhoa(){

   
  }
   //filter Bac
  onFilterBac(){
    this.bac=this.formDanhSachLop.get('bac').value
  }
   //filter hoc ki
  onFilterHocKi(){
    
    this.hocKi= this.formDanhSachLop.get('hocKi').value
  }

}
