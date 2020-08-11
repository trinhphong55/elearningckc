import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChiaseComponent} from '../../components/content/pagelophocphan/chiase/chiase.component';
@Component({
  selector: 'app-page-lophocphan',
  templateUrl: './page-lophocphan.component.html',
  styleUrls: ['./page-lophocphan.component.css']
})
export class PageLophocphanComponent implements OnInit {

  data="";
  constructor(public dialog:MatDialog,private router :ActivatedRoute,private route:Router) { }
  openDialog():void{
    const dialogRef=this.dialog.open(ChiaseComponent,{width:'500px'})
  }
  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }
}
