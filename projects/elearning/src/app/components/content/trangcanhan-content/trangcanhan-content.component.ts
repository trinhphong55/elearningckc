import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';

@Component({
  selector: 'app-trangcanhan-content',
  templateUrl: './trangcanhan-content.component.html',
  styleUrls: ['./trangcanhan-content.component.css']
})
export class TrangcanhanContentComponent implements OnInit {

  constructor(private router :ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
  }
  showThongtinsv(){
    this.route.navigate(['thongtinsv'],{relativeTo:this.router});
  }
  showThoikhoabieu(){
    this.route.navigate(['thoikhoabieusv'],{relativeTo:this.router});
  }
  showThongtindemso(){
    this.route.navigate(['diemsosv'],{relativeTo:this.router});
  }
}
