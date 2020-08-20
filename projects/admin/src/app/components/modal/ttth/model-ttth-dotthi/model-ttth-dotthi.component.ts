import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { DotthiService } from '../../../../services/ttth/dotthi.service';
import { ttthDotThi } from '../../../../../models/ttthDotThi';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from '../../../../../../../common/helper';
import { exit } from 'process';

@Component({
  selector: 'app-model-ttth-dotthi',
  templateUrl: './model-ttth-dotthi.component.html',
  styleUrls: ['./model-ttth-dotthi.component.css']
})
export class ModelTtthDotthiComponent implements OnInit {
  constructor(private modalService: ModalService,private DotthiService: DotthiService,private toastr: ToastrService) { }
  DotThi: ttthDotThi[];
  private _username: any = getCookie('name');
  ngOnInit(): void {
    this.getdanhsach();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.DotthiService.get().subscribe((data) => {this.DotThi = data;  setTimeout(() => {}, 500);});
  }
  reset():void{
    this.selectedItem=null;
  }
  // add
  add(tendot: string,ngaythi: string,giothi: string,phongthi: string,ngayhethan: string): void {
    let kiemtra: any;
    this.DotThi.forEach(function (value) {
      if(value.tendot==tendot&&value.ngaythi==ngaythi){
        kiemtra=true;
      }
    });
    if(kiemtra==true){
      this.toastr.error('Đợt thi đã tồn tại');
    }
    else{
    const newItem: ttthDotThi = new ttthDotThi();
    newItem.tendot = tendot;
    newItem.ngaythi = ngaythi;
    newItem.giothi = giothi;
    newItem.phongthi = phongthi;
    newItem.trangthai = 1;
    newItem.ngayhethan = ngayhethan;
    newItem.nguoitao = this._username;
    newItem.nguoisua = null;
    newItem.created_at = (new Date);
    newItem.updated_at = null;
    this.DotthiService.add(newItem)
      .subscribe(data => {
        this.DotThi.push(data);
        this.getdanhsach();

      });
    this.toastr.success('Thêm thành công');
    }
  }
  ///edit
  selectedItem: ttthDotThi;
  onSelect(DotThi: ttthDotThi):void {
    this.selectedItem= DotThi;
  }
  update(DotThi: ttthDotThi):void {
    DotThi.updated_at= new Date;
    DotThi.nguoisua= this._username;
    this.DotthiService.update(DotThi)
    .subscribe(data => {
      this.DotThi.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(DotThi: ttthDotThi):void {
    var comfirmDel = confirm('Bạn có chắc chắn muốn xóa');
      if(comfirmDel==true){
      this.DotthiService.delete(DotThi)
      .subscribe(data => {
        this.DotThi.push(data);
        this.getdanhsach();
      });
      this.toastr.success('Xóa thành công');
    }
  }

}
