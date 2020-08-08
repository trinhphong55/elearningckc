import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DotthiService } from '../../../../services/ttth/dotthi.service';
import { LophocService } from '../../../../services/ttth/lophoc.service';
import { ttthDotThi } from '../../../../../models/ttthDotThi';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-model-ttth-dotthi',
  templateUrl: './model-ttth-dotthi.component.html',
  styleUrls: ['./model-ttth-dotthi.component.css']
})
export class ModelTtthDotthiComponent implements OnInit {
  constructor(private modalService: ModalService,private DotthiService: DotthiService,private toastr: ToastrService,private lophocService: LophocService) { }
  DotThi: ttthDotThi[];
  LopHoc: any[];

  ngOnInit(): void {
    this.getdanhsach();
    this.getlophoc();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.DotthiService.get().subscribe((data) => {this.DotThi = data; });
  }
  getlophoc(): void {
    this.lophocService.get().subscribe((data) => this.LopHoc = data);
  }
  reset():void{
    this.selectedItem=null;
  }
  // add
  add(tendot: string,lophoc: string,ngaythi: Date): void {
    const newItem: ttthDotThi = new ttthDotThi();
    newItem.tendot = tendot;
    newItem.lophoc = lophoc;
    newItem.ngaythi = ngaythi;
    newItem.trangthai = true;
    newItem.nguoitao = 'hieu';
    newItem.nguoisua = 'loc';
    newItem.created_at = (new Date);
    newItem.updated_at = null;
    this.DotthiService.add(newItem)
      .subscribe(data => {
        this.DotThi.push(data);
        setTimeout(() => {}, 0);
      });
    this.getdanhsach();
    this.toastr.success('Thêm thành công');
  }
  ///edit
  selectedItem: ttthDotThi;
  onSelect(DotThi: ttthDotThi):void {
    this.selectedItem= DotThi;
  }
  update(DotThi: ttthDotThi):void {
    DotThi.updated_at= new Date;
    this.DotthiService.update(DotThi)
    .subscribe(data => {
      this.DotThi.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(DotThi: ttthDotThi):void {
    this.DotthiService.delete(DotThi)
    .subscribe(data => {
      this.DotThi.push(data);
      setTimeout(() => {}, 0);
    });
    this.getdanhsach();
    // window.location.reload();
    this.toastr.success('Xóa thành công');
  }

}
