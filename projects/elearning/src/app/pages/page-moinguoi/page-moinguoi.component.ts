import { Component, OnInit } from '@angular/core';
import {MoigvComponent} from '../../components/content/pageMoinguoi/moigv/moigv.component';
import { MatDialog } from '@angular/material/dialog';
import {MoisvComponent} from '../../components/content/pageMoinguoi/moisv/moisv.component';

@Component({
  selector: 'app-page-moinguoi',
  templateUrl: './page-moinguoi.component.html',
  styleUrls: ['./page-moinguoi.component.css']
})
export class PageMoinguoiComponent implements OnInit {

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
