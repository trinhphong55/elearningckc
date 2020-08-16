import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { CamonService } from '../../../../services/ttth/camon.service';
import { ttthCamOn } from '../../../../../models/ttthCamOn';
import { getCookie } from '../../../../../../../common/helper';

const URL = 'https://localhost:4100/api/ttthCamOn/uploads';
@Component({
  selector: 'app-modal-home-camon',
  templateUrl: './modal-home-camon.component.html',
  styleUrls: ['./modal-home-camon.component.css']
})
export class ModalHomeCamonComponent implements OnInit {
  CamOn: ttthCamOn[];
  private _username: any = getCookie('name');

  constructor(private modalService: ModalService,private camonService: CamonService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getdanhsach();
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
  getdanhsach(): void {
    this.camonService.get().subscribe((data) => {this.CamOn = data; setTimeout(() => {}, 500);});
  }
   addCamOn(tieudechinh: string,tieudephu: string,icon: string): void {
      tieudechinh = tieudechinh.trim();
      tieudephu = tieudephu.trim();
      icon = icon.trim();
       const newItem: ttthCamOn = new ttthCamOn();
       newItem.icon = icon;
       newItem.tieudechinh = tieudechinh;
       newItem.tieudephu = tieudephu;
       newItem.trangthai = true;
       newItem.nguoitao = this._username;
       newItem.nguoisua = null;
       newItem.created_at = (new Date);
       newItem.updated_at = null;
       this.camonService.add(newItem)
         .subscribe(data => {
           this.CamOn.push(data);
        this.getdanhsach();

         });
       this.toastr.success('Thêm thành công');
   }
  ///edit
  selectedItem: ttthCamOn;
  onSelect(CamOn: ttthCamOn):void {
    this.selectedItem= CamOn;
  }
  saveCamOn(CamOn: ttthCamOn):void {
    CamOn.updated_at= new Date;
    CamOn.nguoisua= this._username;

    this.camonService.update(CamOn)
    .subscribe(data => {
      this.CamOn.push(data);
    this.getdanhsach();

    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  xoaCamOn(CamOn: ttthCamOn):void {
    var comfirmDel = confirm('Bạn có chắc chắn muốn xóa');
    if(comfirmDel==true){
      CamOn.nguoisua= this._username;
      this.camonService.delete(CamOn)
      .subscribe(data => {
        this.CamOn.push(data);
      this.getdanhsach();

      });
      this.toastr.success('Xóa thành công');
    }
  }
  reset():void{
    this.selectedItem=null;
  }
}
