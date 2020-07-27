import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormTaolophocContentComponent} from './form-taolophoc-content/form-taolophoc-content.component'


@Component({
  selector: 'app-taolophoc-content',
  templateUrl: './taolophoc-content.component.html',
  styleUrls: ['./taolophoc-content.component.css']
})
export class TaolophocContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaolophocContentComponent>,public dialog:MatDialog) { }
 
  onNoClick(): void {
    this.dialogRef.close();
  }
  openDialogFTLH(){
    this.dialog.open(FormTaolophocContentComponent,{width: '500px'});
  }
  checked: boolean=false;
  ngOnInit(): void {
  }

}
