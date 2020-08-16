import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { DiemthiService } from '../../../../services/ttth/diemthi.service';
import { ttthDiemThi } from '../../../../../models/ttthDiemThi';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from '../../../../../../../common/helper';
@Component({
  selector: 'app-modal-ttth-quanlidiemthi',
  templateUrl: './modal-ttth-quanlidiemthi.component.html',
  styleUrls: ['./modal-ttth-quanlidiemthi.component.css']
})
export class ModalTtthQuanlidiemthiComponent implements OnInit {
  constructor(private modalService: ModalService,private DiemthiService: DiemthiService ,private toastr: ToastrService) { }
  DiemThi: ttthDiemThi[];
  private _username: any = getCookie('name');
  ngOnInit(): void {
    this.getdanhsach();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.DiemthiService.get().subscribe((data) => {this.DiemThi = data;setTimeout(() => {}, 500);});
  }
  reset():void{
    this.selectedItem=null;
  }
  ///edit
  selectedItem: ttthDiemThi;
  onSelect(DiemThi: ttthDiemThi):void {
    this.selectedItem= DiemThi;
  }
  update(DiemThi: ttthDiemThi):void {
    DiemThi.updated_at= new Date;
    DiemThi.nguoisua= this._username;
    this.DiemthiService.update(DiemThi)
    .subscribe(data => {
      this.DiemThi.push(data);
      this.getdanhsach();
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(DiemThi: ttthDiemThi):void {
    var comfirmDel = confirm('Bạn có chắc chắn muốn xóa');
    if(comfirmDel==true){
      DiemThi.nguoisua= this._username;
      DiemThi.updated_at= new Date;

      this.DiemthiService.delete(DiemThi)
      .subscribe(data => {
        this.DiemThi.push(data);
        this.getdanhsach();
      });
      this.toastr.success('Xóa thành công');
    }
  }

}
