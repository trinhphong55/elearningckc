import { Component, OnInit } from '@angular/core';
import {TaobaitapComponent} from '../../components/content/chudelophocphan/taobaitap/taobaitap.component';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TaochudeComponent} from '../../components/content/chudelophocphan/taochude/taochude.component';
import {TaobaiktraComponent} from '../../components/content/chudelophocphan/taobaiktra/taobaiktra.component';
import {TaocauhoiComponent} from '../../components/content/chudelophocphan/taocauhoi/taocauhoi.component';
import {TaotailieuComponent} from '../../components/content/chudelophocphan/taotailieu/taotailieu.component';
import {XembaitapgvComponent} from '../../components/content/chudelophocphan/allchude/xembaitapgv/xembaitapgv.component';
import {XemtailieugvComponent} from '../../components/content/chudelophocphan/allchude/xemtailieugv/xemtailieugv.component';
import {XemtailieusvComponent} from '../../components/content/chudelophocphan/allchude/xemtailieusv/xemtailieusv.component';
import {XembaitapsvComponent} from '../../components/content/chudelophocphan/allchude/xembaitapsv/xembaitapsv.component';

@Component({
  selector: 'app-page-chudelophocphan',
  templateUrl: './page-chudelophocphan.component.html',
  styleUrls: ['./page-chudelophocphan.component.css']
})
export class PageChudelophocphanComponent implements OnInit {

  constructor(public dialog: MatDialog,private router :ActivatedRoute,private route:Router) { }

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
