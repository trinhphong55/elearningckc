import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-hocphan',
  templateUrl: './navbar-hocphan.component.html',
  styleUrls: ['./navbar-hocphan.component.css']
})
export class NavbarHocphanComponent implements OnInit {

  data="";
  constructor(private router :ActivatedRoute,private route:Router) { }
  malophocphan:any;
  lophocphan:string;
  baigiang:string;
  moinguoi:string;
  cotdiem:string;
  huongdan:string;
  baitapgv:string;

    

  ngOnInit(): void {
    this.malophocphan = this.router.snapshot.paramMap.get('id');
    this.lophocphan="/lophocphan/"+this.malophocphan;
    this.baigiang="/baigiang/"+this.malophocphan;
    this.moinguoi="/moinguoi/"+this.malophocphan;
    this.cotdiem="/cotdiem/"+this.malophocphan;
    this.huongdan="/huongdan/"+this.malophocphan;
    this.baitapgv="/baitapgv/"+this.malophocphan;
    
    this.data=this.router.snapshot.paramMap.get('id');
  }
}
