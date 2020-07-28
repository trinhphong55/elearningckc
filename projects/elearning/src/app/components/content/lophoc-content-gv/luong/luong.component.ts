import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChiaseComponent} from './chiase/chiase.component';
import {NoidungbaitapComponent} from './noidungbaitap/noidungbaitap.component';
import {NoidungtaileuComponent} from './noidungtaileu/noidungtaileu.component';
import {NoidungbaitapsvComponent} from './noidungbaitapsv/noidungbaitapsv.component';
import {NoidungtailieusvComponent} from './noidungtailieusv/noidungtailieusv.component';



@Component({
  selector: 'app-luong',
  templateUrl: './luong.component.html',
  styleUrls: ['./luong.component.css']
})
export class LuongComponent implements OnInit {
  data="";
  constructor(public dialog:MatDialog,private router :ActivatedRoute,private route:Router) { }
  openDialog():void{
    const dialogRef=this.dialog.open(ChiaseComponent,{width:'500px'})
  }
  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }
  openNDBT():void{
    const dialogRef=this.dialog.open(NoidungbaitapComponent,{width:'100%',height:'100vh'})
  }
  openNDTL():void{
    const dialogRef=this.dialog.open(NoidungtaileuComponent,{width:'100%',height:'100vh'})
  }
  openNDBTSV():void{
    const dialogRef=this.dialog.open(NoidungbaitapsvComponent,{width:'100%',height:'100vh'})
  }
  openNDTLSV():void{
    const dialogRef=this.dialog.open(NoidungtailieusvComponent,{width:'100%',height:'100vh'})
  }
}
