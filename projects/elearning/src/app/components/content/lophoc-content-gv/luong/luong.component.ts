import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChiaseComponent} from './chiase/chiase.component'



@Component({
  selector: 'app-luong',
  templateUrl: './luong.component.html',
  styleUrls: ['./luong.component.css']
})
export class LuongComponent implements OnInit {
  data="";
  constructor(private router :ActivatedRoute,public dialog:MatDialog) { }
  openDialog():void{
    const dialogRef=this.dialog.open(ChiaseComponent,{width:'500px'})
  }
  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }

}
