import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {TaolophocContentComponent} from './taolophoc-content/taolophoc-content.component'
  import { from } from 'rxjs';
@Component({
  selector: 'app-taolophoc',
  templateUrl: './taolophoc.component.html',
  styleUrls: ['./taolophoc.component.css']
})
export class TaolophocComponent implements OnInit {



  constructor(public dialog:MatDialog){}
  openDialogTLH(){
    this.dialog.open(TaolophocContentComponent,{width: '400px'});
  }

  ngOnInit(): void {
  }

}
