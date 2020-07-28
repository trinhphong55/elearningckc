import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
interface lophoc {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-thoikhoabieuct',
  templateUrl: './thoikhoabieuct.component.html',
  styleUrls: ['./thoikhoabieuct.component.css']
})
export class ThoikhoabieuctComponent implements OnInit {

  constructor(private router :ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
  }
  lophocs: lophoc[] = [
    {value: 'steak-0', viewValue: 'CDTH17D'},
    {value: 'pizza-1', viewValue: 'CDTH17B'},
    {value: 'tacos-2', viewValue: 'CDTH17C'},
    {value: 'tacos-2', viewValue: 'CDTH17A'}
  ];
  showLop(){
    this.route.navigate(['lop/lophocss'],{relativeTo:this.router});
  }
  selectedValue: string;

  
}
