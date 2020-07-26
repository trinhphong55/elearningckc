import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ThamgialophocContentComponent} from './thamgialophoc-content/thamgialophoc-content.component'
import { from } from 'rxjs';


@Component({
  selector: 'app-thamgialophoc',
  templateUrl: './thamgialophoc.component.html',
  styleUrls: ['./thamgialophoc.component.css']
})
export class ThamgialophocComponent implements OnInit {
  constructor(public dialog:MatDialog){}
  openDialogTGLH(){
    this.dialog.open(ThamgialophocContentComponent);
  }

  ngOnInit(): void {
  }

}
