import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { DiemthiService } from '../../../../services/ttth/diemthi.service';
import { ttthDiemThi } from '../../../../../models/ttthDiemThi';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-ttth-quanlidiemthi',
  templateUrl: './modal-ttth-quanlidiemthi.component.html',
  styleUrls: ['./modal-ttth-quanlidiemthi.component.css']
})
export class ModalTtthQuanlidiemthiComponent implements OnInit {
  constructor(private modalService: ModalService,private DiemthiService: DiemthiService ,private toastr: ToastrService) { }
  DiemThi: ttthDiemThi[];
  ngOnInit(): void {
    this.getdanhsach();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.DiemthiService.get().subscribe((data) => {this.DiemThi = data});
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
    this.DiemthiService.update(DiemThi)
    .subscribe(data => {
      this.DiemThi.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(DiemThi: ttthDiemThi):void {
    this.DiemthiService.delete(DiemThi)
    .subscribe(data => {
      this.DiemThi.push(data);
      setTimeout(() => {}, 0);
    });
    this.getdanhsach();
    // window.location.reload();
    this.toastr.success('Xóa thành công');
  }

}
