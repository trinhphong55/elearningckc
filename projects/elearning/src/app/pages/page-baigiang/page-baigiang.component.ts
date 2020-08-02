import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';


@Component({
  selector: 'app-page-baigiang',
  templateUrl: './page-baigiang.component.html',
  styleUrls: ['./page-baigiang.component.css']
})
export class PageBaigiangComponent implements OnInit {

  constructor(private router :ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
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
