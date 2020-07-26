import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';

@Component({ 
  selector: 'app-lophoc-content-gv',
  templateUrl: './lophoc-content-gv.component.html',
  styleUrls: ['./lophoc-content-gv.component.css']
})
export class LophocContentGvComponent implements OnInit {

  data="";
  constructor(private router :ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }
  showLuong(){
    this.route.navigate(['luong'],{relativeTo:this.router});
  }
  showBaitaptrenlop(){
    this.route.navigate(['baitaptrenlop'],{relativeTo:this.router});
  }
  showmoinguoi(){
    this.route.navigate(['moinguoi'],{relativeTo:this.router});
  }
  showsodiem(){
    this.route.navigate(['sodiem'],{relativeTo:this.router});
  }
  showhuongdan(){
    this.route.navigate(['huongdan'],{relativeTo:this.router});
  }
  showbaitapgv(){
    this.route.navigate(['baitapgv'],{relativeTo:this.router});
  }
}
