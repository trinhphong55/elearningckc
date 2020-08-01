import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-moigv',
  templateUrl: './moigv.component.html',
  styleUrls: ['./moigv.component.css']
})
export class MoigvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
