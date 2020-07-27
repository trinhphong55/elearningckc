import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TaobaitapComponent} from './taobaitap/taobaitap.component';
import {TaochudeComponent} from './taochude/taochude.component';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';

@Component({
  selector: 'app-baitaptrenlop',
  templateUrl: './baitaptrenlop.component.html',
  styleUrls: ['./baitaptrenlop.component.css']
})
export class BaitaptrenlopComponent implements OnInit {

  constructor(public dialog: MatDialog,private router :ActivatedRoute,private route:Router) { }
  panelOpenState = false;
  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(TaobaitapComponent,{width:'100%',height:'100vh'});
  }
  opentaochude(){
    this.dialog.open(TaochudeComponent,{width:'250px'});
  }
  showAllchude(){
    this.route.navigate(['all'],{relativeTo:this.router});
  }
  showchude1(){
    this.route.navigate(['chude1'],{relativeTo:this.router});
  }
  showchude2(){
    this.route.navigate(['chude2'],{relativeTo:this.router});
  }
  showchude3(){
    this.route.navigate(['chude3'],{relativeTo:this.router});
  }
  showchude4(){
    this.route.navigate(['chude4'],{relativeTo:this.router});
  }
}
