import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-thamgialophoc-content',
  templateUrl: './thamgialophoc-content.component.html',
  styleUrls: ['./thamgialophoc-content.component.css']
})
export class ThamgialophocContentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ThamgialophocContentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
