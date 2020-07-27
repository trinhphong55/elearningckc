import { Component, OnInit } from '@angular/core';
import {AccountComponent} from './account/account.component';

import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-tao-or-thamgia-lophoc',
  templateUrl: './tao-or-thamgia-lophoc.component.html',
  styleUrls: ['./tao-or-thamgia-lophoc.component.css']
})
export class TaoOrThamgiaLophocComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }


  openAccount(){
    this.dialog.open(AccountComponent,{width: '400px'});
  }
}
