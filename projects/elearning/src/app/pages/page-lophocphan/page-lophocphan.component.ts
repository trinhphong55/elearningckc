import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChiaseComponent} from '../../components/content/pagelophocphan/chiase/chiase.component';
import {NoidungbaitapComponent} from '../../components/content/pagelophocphan/noidungbaitap/noidungbaitap.component';
import {NoidungtaileuComponent} from '../../components/content/pagelophocphan/noidungtaileu/noidungtaileu.component';
import {NoidungbaitapsvComponent} from '../../components/content/pagelophocphan/noidungbaitapsv/noidungbaitapsv.component';
import {NoidungtailieusvComponent} from '../../components/content/pagelophocphan/noidungtailieusv/noidungtailieusv.component';

@Component({
  selector: 'app-page-lophocphan',
  templateUrl: './page-lophocphan.component.html',
  styleUrls: ['./page-lophocphan.component.css']
})
export class PageLophocphanComponent implements OnInit {

  data="";
  constructor(public dialog:MatDialog,private router :ActivatedRoute,private route:Router) { }
  openDialog():void{
    const dialogRef=this.dialog.open(ChiaseComponent,{width:'500px'})
  }
  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }
  openNDBT():void{
    const dialogRef=this.dialog.open(NoidungbaitapComponent,{width:'100%',height:'100vh',maxWidth:'90vw'})
  }
  openNDTL():void{
    const dialogRef=this.dialog.open(NoidungtaileuComponent,{width:'100%',height:'100vh',maxWidth:'90vw'})
  }
  openNDBTSV():void{
    const dialogRef=this.dialog.open(NoidungbaitapsvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'})
  }
  openNDTLSV():void{
    const dialogRef=this.dialog.open(NoidungtailieusvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'})
  }
}
