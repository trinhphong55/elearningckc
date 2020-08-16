import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChiaseComponent} from '../../components/content/pagelophocphan/chiase/chiase.component';
import { ActivityService } from '../../services/activity.service';
import { LopHocPhanService } from '../../services/lophocphan.service';
import { getCookie } from '../../../../../common/helper';
@Component({
  selector: 'app-page-lophocphan',
  templateUrl: './page-lophocphan.component.html',
  styleUrls: ['./page-lophocphan.component.css']
})
export class PageLophocphanComponent implements OnInit {

  maLHP:number;
  tenLHP: any;
  soLuongSV: any;
  role:any = getCookie('role').toLocaleLowerCase();
  dsActivity: any;
  constructor(public dialog:MatDialog, private router :ActivatedRoute, private activityService:ActivityService, private lhpService:LopHocPhanService) {
    this.maLHP = parseInt(this.router.snapshot.paramMap.get('id'));
    this.lhpService.layLopHocPhanTheoMaLHP(this.maLHP).subscribe(
      (res) => {
        this.tenLHP = res.data.tenLopHocPhan;
        this.soLuongSV = res.data.soLuongSV;
      }
    )
    this.activityService.layDanhSachActivityCuaLHP(this.maLHP).subscribe(
      (res) => {
        this.dsActivity = res.data;
        this.dsActivity.map(activity => {
          switch(activity.loaiDoiTuong){
            case 'BT':{
            }
            case 'BL-BT':{
              activity.route = `/xembaitap${this.role}/${activity.maDoiTuong}`;
              break;
            }
            default:{
              activity.route = `/xembaigiang${this.role}/${activity.maDoiTuong}`;
            }
          }
        })
      }
    )
  }
  openDialog():void{
    const dialogRef = this.dialog.open(ChiaseComponent,{width:'500px'});
  }
  ngOnInit(): void {

  }
}
