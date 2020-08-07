import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar-hocphan',
  templateUrl: './navbar-hocphan.component.html',
  styleUrls: ['./navbar-hocphan.component.css']
})
export class NavbarHocphanComponent implements OnInit {

  data="";
  constructor(private router :ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.data=this.router.snapshot.paramMap.get('id');
  }

}
