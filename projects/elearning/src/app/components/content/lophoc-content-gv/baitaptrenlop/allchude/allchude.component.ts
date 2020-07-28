import { Component, OnInit } from '@angular/core';
import {TaobaitapComponent} from '../taobaitap/taobaitap.component';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TaochudeComponent} from '../taochude/taochude.component';
import {TaobaiktraComponent} from '../taobaiktra/taobaiktra.component';
import {TaocauhoiComponent} from '../taocauhoi/taocauhoi.component';
import {TaotailieuComponent} from '../taotailieu/taotailieu.component';
import {XembaitapgvComponent} from './xembaitapgv/xembaitapgv.component';
import {XemtailieugvComponent} from './xemtailieugv/xemtailieugv.component';
import {XemtailieusvComponent} from './xemtailieusv/xemtailieusv.component';
import {XembaitapsvComponent} from './xembaitapsv/xembaitapsv.component';
@Component({
  selector: 'app-allchude',
  templateUrl: './allchude.component.html',
  styleUrls: ['./allchude.component.css']
})
export class AllchudeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openTaobaitap() {
    this.dialog.open(TaobaitapComponent,{width:'100%',height:'100vh'});
  }
  opentaochude(){
    this.dialog.open(TaochudeComponent,{width:'250px'});
  }
  openTaobaiktra(){
    this.dialog.open(TaobaiktraComponent,{width:'100%',height:'100vh'});
  }
  openTaocauhoi(){
    this.dialog.open(TaocauhoiComponent,{width:'100%',height:'100vh'});
  }
  openTaotailieu(){
    this.dialog.open(TaotailieuComponent,{width:'100%',height:'100vh'});
  }
  openXBTGV(){
    this.dialog.open(XembaitapgvComponent,{width:'100%',height:'100vh'});
  }
  openXTLGV(){
    this.dialog.open(XemtailieugvComponent,{width:'100%',height:'100vh'});
  }
  openXTLSV(){
    this.dialog.open(XemtailieusvComponent,{width:'100%',height:'100vh'});
  }
  openXBTSV(){
    this.dialog.open(XembaitapsvComponent,{width:'100%',height:'100vh'});
  }
}
