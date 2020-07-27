import { Component, OnInit } from '@angular/core';
import {MoigvComponent} from './moigv/moigv.component';
import { MatDialog } from '@angular/material/dialog';
import {MoisvComponent} from './moisv/moisv.component';
@Component({
  selector: 'app-moinguoi',
  templateUrl: './moinguoi.component.html',
  styleUrls: ['./moinguoi.component.css']
})
export class MoinguoiComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openMoigv(){
    this.dialog.open(MoigvComponent,{width: '400px'});
  }
  openMoisv(){
    this.dialog.open(MoisvComponent,{width: '400px'});
  }
}
