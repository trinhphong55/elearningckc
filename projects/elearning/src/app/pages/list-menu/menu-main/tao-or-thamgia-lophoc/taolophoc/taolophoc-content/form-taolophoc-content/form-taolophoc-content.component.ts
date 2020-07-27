import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-form-taolophoc-content',
  templateUrl: './form-taolophoc-content.component.html',
  styleUrls: ['./form-taolophoc-content.component.css']
})
export class FormTaolophocContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormTaolophocContentComponent>) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  checked: boolean=false;
  ngOnInit(): void {
  }

}
