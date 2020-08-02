import { Component, OnInit } from '@angular/core';
import { Lophoc } from './service-lophoc/lophoc';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-lophoc-content',
  templateUrl: './lophoc-content.component.html',
  styleUrls: ['./lophoc-content.component.css']
})
export class LophocContentComponent implements OnInit {
    lophocs:Lophoc[]=[{id:1,name:'Cơ sử dữ liệu',status:true},
    {id:2,name:'Nhập môn lập trình',status:true},
    {id:3,name:'Cấu trúc dữ liệu',status:true},
    {id:4,name:'Toán rời rạc',status:true},
    {id:5,name:'Lập trình laravel',status:true},
    {id:6,name:'lập trình HDT',status:true}
  ];
  image1:string=""
  constructor() { }

  ngOnInit(): void {
  }
  toppings = new FormControl();
  toppingList: string[] = ['học kì 1', 'học kì 2', 'học kì 3', 'học kì 4', 'học kì 5', 'học kì 6'];
  khoahocs=new FormControl();
  khoahocList: string[] =['khóa 17','khóa 18','khóa 19','khóa 20'];

}
