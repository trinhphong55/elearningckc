import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-taobaitap',
  templateUrl: './taobaitap.component.html',
  styleUrls: ['./taobaitap.component.css']
})
export class TaobaitapComponent implements OnInit {

  checked: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toppings = new FormControl();

  toppingList: string[] = ['Cấu trúc dữ liệu', 'lập trình HDT', 'Thiết kế web', 'Pepperoni', 'Sausage', 'Tomato'];
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}

