import { Component, OnInit } from '@angular/core';
import {TaobaitapComponent} from '../../components/content/chudelophocphan/taobaitap/taobaitap.component';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TaochudeComponent} from '../../components/content/chudelophocphan/taochude/taochude.component';
import {TaobaigiangComponent} from '../../components/content/chudelophocphan/taobaigiang/taobaigiang.component';
import {XembaitapgvComponent} from '../../components/content/chudelophocphan/allchude/xembaitapgv/xembaitapgv.component';
import {XembaiganggvComponent} from '../../components/content/chudelophocphan/allchude/xembaiganggv/xembaiganggv.component';
import {XembaigiangsvComponent} from '../../components/content/chudelophocphan/allchude/xembaigiangsv/xembaigiangsv.component';
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
    this.dialog.open(TaobaitapComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
  opentaochude(){
    this.dialog.open(TaochudeComponent,{width:'250px'});
  }
  openTaotailieu(){
    this.dialog.open(TaobaigiangComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
  openXBTGV(){
    this.dialog.open(XembaitapgvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
  openXTLGV(){
    this.dialog.open(XembaiganggvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
  openXTLSV(){
    this.dialog.open(XembaigiangsvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
  openXBTSV(){
    this.dialog.open(XembaitapsvComponent,{width:'100%',height:'100vh',maxWidth:'90vw'});
  }
}
